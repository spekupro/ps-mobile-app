import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '@/src/components/CustomButton';
import AuthService from '@/src/services/auth.service';
import { DokobitLogin, AuthStep } from '@/src/components/auth/interfaces/eid.interface';
import apiClient from '@/src/services/api.client';

interface DokobitAuthProps {
    visible: boolean;
    onAuthSuccess: () => void;
    onAuthError: (error: string) => void;
    onCancel: () => void;
}

const DokobitAuth: React.FC<DokobitAuthProps> = ({ visible, onAuthSuccess, onAuthError, onCancel }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dokobitToken, setDokobitToken] = useState<string | null>(null);
    const [webViewHtml, setWebViewHtml] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (visible) {
            initializeDokobitAuth().then();
        }
    }, [visible]);

    const initializeDokobitAuth = useCallback(async () => {
        try {
            setIsLoading(true);
            const session = await AuthService.startEIDAuthentication();
            setDokobitToken(session.dokobitToken);

            // Fetch the actual HTML from Dokobit
            const html = await fetchDokobitHtml(session.dokobitToken);
            setWebViewHtml(html);

            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        } catch (err) {
            console.log(err);
            setError('Failed to initialize authentication');
            onAuthError('Failed to initialize authentication');
        }
    }, [onAuthError]);

    const fetchDokobitHtml = async (token: string): Promise<string> => {
        const response = await apiClient.get(`https://id-sandbox.dokobit.com/auth/${token}?_locale=en&version=2`, {
            method: 'GET',
            headers: {
                'Accept': 'text/html',
                'origin': 'http://partner.montonio:4201',
            },
        });
        console.log('html', response);

        if (!response) {
            throw new Error('Failed to fetch Dokobit HTML');
        }

        const html = await response.data;

        // Inject JavaScript to communicate with React Native
        return injectReactNativeBridge(html);
    };

    const injectReactNativeBridge = (html: string): string => {
        const injectedScript = `
            <script>
                // Monitor for the callback URL that Dokobit redirects to
                (function() {
                    const checkForCallback = setInterval(() => {
                        const url = window.location.href;
                        if (url.includes('/complete/')) {
                            clearInterval(checkForCallback);
                            // Extract return token from URL path
                            const returnToken = window.location.pathname.split('/complete/')[1]?.split('?')[0];

                            if (returnToken && window.ReactNativeWebView) {
                                window.ReactNativeWebView.postMessage(JSON.stringify({
                                    type: 'AUTH_SUCCESS',
                                    returnToken: returnToken
                                }));
                            }
                        }
                    }, 100);
                })();
            </script>
        `;

        // Inject before closing </body> tag
        return html.replace('</body>', `${injectedScript}</body>`);
    };

    const handleWebViewMessage = useCallback(async (event: any) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);

            if (data.type === 'AUTH_SUCCESS') {
                setIsLoading(true);

                try {
                    const result: DokobitLogin = await AuthService.dokobitLogin(data.returnToken);

                    if (result.nextStep === AuthStep.LOGIN) {
                        onAuthSuccess();
                    } else if (result.nextStep === AuthStep.SELECT_USER) {
                        // Handle user selection (to be implemented)
                        Alert.alert('Multiple Users', 'User selection not yet implemented');
                    }
                } catch (err) {
                    onAuthError('Authentication failed');
                }
            }
        } catch (err) {
            onAuthError('Invalid response from authentication service');
        }
    }, [onAuthSuccess, onAuthError]);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Authenticate to continue</Text>
                    <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                </View>

                {!error && <Text style={styles.subtext}>Choose your eID provider</Text>}

                {error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <CustomButton
                            title="Retry"
                            handlePress={initializeDokobitAuth}
                            containerStyles="mt-4"
                        />
                        <CustomButton
                            title="Cancel"
                            handlePress={onCancel}
                            containerStyles="mt-2 border-2 border-gray-300"
                            textStyles="text-gray-600"
                        />
                    </View>
                ) : (
                    <>
                        <View style={styles.webviewContainer}>
                            {isLoading && (
                                <View style={styles.loadingOverlay}>
                                    <ActivityIndicator size="large" color="#5C14EB" />
                                    <Text style={styles.loadingText}>Loading authentication...</Text>
                                </View>
                            )}

                            {webViewHtml && (
                                <WebView
                                    source={{ html: webViewHtml }}
                                    style={styles.webview}
                                    onMessage={handleWebViewMessage}
                                    javaScriptEnabled
                                    domStorageEnabled
                                    startInLoadingState={false}
                                    onLoadEnd={() => setIsLoading(false)}
                                    originWhitelist={['*']}
                                    mixedContentMode="always"
                                />
                            )}
                        </View>

                        <View style={styles.footer}>
                            <CustomButton
                                title="Cancel"
                                handlePress={onCancel}
                                containerStyles="border-2 border-gray-300"
                                textStyles="text-gray-600"
                            />
                        </View>
                    </>
                )}
            </View>
            <StatusBar style="dark" />
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1B0547',
    },
    closeButton: {
        padding: 8,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#6B7280',
    },
    subtext: {
        fontSize: 14,
        color: '#6B7280',
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 16,
        backgroundColor: '#fff',
    },
    webviewContainer: {
        flex: 1,
        position: 'relative',
    },
    webview: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#6B7280',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#dc2626',
        textAlign: 'center',
        marginBottom: 16,
    },
    footer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
});

export default DokobitAuth;
