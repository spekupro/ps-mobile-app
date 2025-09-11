import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '@/components/CustomButton';
import AuthService from '@/services/auth.service';
import { DokobitLogin, AuthStep } from '@/types/eid.interface';

interface DokobitAuthProps {
    onAuthSuccess: () => void;
    onAuthError: (error: string) => void;
    onCancel: () => void;
}

const DokobitAuth: React.FC<DokobitAuthProps> = ({ onAuthSuccess, onAuthError, onCancel }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dokobitToken, setDokobitToken] = useState<string | null>(null);
    const [webViewHtml, setWebViewHtml] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        initializeDokobitAuth().then();
    }, []);

    const initializeDokobitAuth = useCallback(async () => {
        try {
            setIsLoading(true);
            const session = await AuthService.startEIDAuthentication();
            setDokobitToken(session.dokobitToken);

            // Create HTML that integrates with Dokobit SDK
            const html = createDokobitHtml(session.dokobitToken);
            setWebViewHtml(html);

            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        } catch (err) {
            setError('Failed to initialize authentication');
            onAuthError('Failed to initialize authentication');
        }
    }, [onAuthError]);

    const createDokobitHtml = (token: string): string => {
        return `
        <!DOCTYPE html>
        <html>
        <script type="text/javascript" src="https://id-sandbox.dokobit.com/js/dokobit-integration.min.js" id="dokobitIDGateway"></script>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dokobit Authentication</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f8f9fa;
                }
                .container {
                    max-width: 500px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    padding: 24px;
                }
                .header {
                    text-align: center;
                    margin-bottom: 24px;
                }
                .title {
                    color: #1B0547;
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 8px;
                }
                .subtitle {
                    color: #6B7280;
                    font-size: 16px;
                }
                #Dokobit-identity-container {
                    min-height: 300px;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    padding: 16px;
                    background: #fafafa;
                }
                .loading {
                    text-align: center;
                    padding: 40px;
                    color: #6B7280;
                }
                .error {
                    background-color: #fee2e2;
                    border: 1px solid #fecaca;
                    color: #dc2626;
                    padding: 16px;
                    border-radius: 8px;
                    margin-bottom: 16px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 class="title">Authenticate to continue</h1>
                    <p class="subtitle">Choose your eID provider</p>
                </div>
                <div id="Dokobit-identity-container">
                    <div class="loading">Loading authentication options...</div>
                </div>
            </div>

            <script>
                // Simulate Dokobit SDK behavior
                (function() {
                    const container = document.getElementById('Dokobit-identity-container');
                    
                    // Simulate loading delay
                    setTimeout(() => {
                        container.innerHTML = \`
                            <div style="text-align: center; padding: 20px;">
                                <h3 style="color: #1B0547; margin-bottom: 20px;">Select your eID provider</h3>
                                <div style="display: flex; flex-direction: column; gap: 12px;">
                                    <button onclick="authenticate('smart-id')" style="
                                        background: #5C14EB;
                                        color: white;
                                        border: none;
                                        padding: 12px 24px;
                                        border-radius: 6px;
                                        font-size: 16px;
                                        cursor: pointer;
                                    ">Smart-ID</button>
                                    <button onclick="authenticate('mobile-id')" style="
                                        background: #5C14EB;
                                        color: white;
                                        border: none;
                                        padding: 12px 24px;
                                        border-radius: 6px;
                                        font-size: 16px;
                                        cursor: pointer;
                                    ">Mobile-ID</button>
                                    <button onclick="authenticate('id-card')" style="
                                        background: #5C14EB;
                                        color: white;
                                        border: none;
                                        padding: 12px 24px;
                                        border-radius: 6px;
                                        font-size: 16px;
                                        cursor: pointer;
                                    ">ID-Card</button>
                                </div>
                            </div>
                        \`;
                    }, 1000);
                })();

                function authenticate(provider) {
                    const container = document.getElementById('Dokobit-identity-container');
                    container.innerHTML = \`
                        <div style="text-align: center; padding: 40px;">
                            <div style="margin-bottom: 20px;">
                                <div style="width: 50px; height: 50px; border: 3px solid #5C14EB; border-top: 3px solid transparent; border-radius: 50%; margin: 0 auto; animation: spin 1s linear infinite;"></div>
                            </div>
                            <h3 style="color: #1B0547; margin-bottom: 10px;">Authenticating with \${provider}</h3>
                            <p style="color: #6B7280;">Please complete the authentication process...</p>
                        </div>
                        <style>
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        </style>
                    \`;
                    
                    // Simulate authentication process
                    setTimeout(() => {
                        // Simulate successful authentication with return token
                        const returnToken = 'mock-return-token-' + Date.now();
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: 'AUTH_SUCCESS',
                            returnToken: returnToken
                        }));
                    }, 3000);
                }
            </script>
        </body>
        </html>
        `;
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

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
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
                <StatusBar style="dark" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
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
                    startInLoadingState
                    onLoadEnd={() => setIsLoading(false)}
                />
            )}

            <View style={styles.footer}>
                <CustomButton
                    title="Cancel"
                    handlePress={onCancel}
                    containerStyles="border-2 border-gray-300"
                    textStyles="text-gray-600"
                />
            </View>
            <StatusBar style="dark" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    webview: {
        flex: 1,
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
