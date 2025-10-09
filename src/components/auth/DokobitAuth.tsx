import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import CustomButton from '@/src/components/CustomButton';
import AuthService from '@/src/services/auth.service';
import { AuthStep, DokobitLogin, EidUser } from '@/src/components/auth/interfaces/eid.interface';
import { getDokobitHtml } from '@/src/components/auth/helpers/dokobitTemplate';
import { styles } from '@/src/components/auth/styles/DokobitAuth.styles';

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
    const [choosingUser, setChoosingUser] = useState(false);
    const [users, setUsers] = useState<EidUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    useEffect(() => {
        if (visible) {
            initializeDokobitAuth().then();
        }
    }, [visible]);

    const initializeDokobitAuth = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const session = await AuthService.startEIDAuthentication();
            setDokobitToken(session.dokobitToken);

            const html = await getDokobitHtml(session.dokobitToken, 'en');
            setWebViewHtml(html);

            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        } catch (err) {
            setIsLoading(false);
            const errorMessage = err instanceof Error ? err.message : 'Failed to initialize authentication';
            setError(errorMessage);
            onAuthError(errorMessage);
        }
    }, [onAuthError]);

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
                        setUsers(result.users);
                        setSelectedUser(result.users[0]?.uuid || null);
                        setChoosingUser(true);
                        setIsLoading(false);
                    }
                } catch (err) {
                    setIsLoading(false);
                    onAuthError('Authentication failed');
                }
            } else if (data.type === 'AUTH_ERROR') {
                setIsLoading(false);
                onAuthError(data.error || 'Authentication error');
            }
        } catch (err) {
            setIsLoading(false);
            onAuthError('Invalid response from authentication service');
        }
    }, [onAuthSuccess, onAuthError]);

    const handleFinishLogin = useCallback(async () => {
        if (!selectedUser) return;

        setIsLoading(true);
        try {
            await AuthService.finishEIDAuthentication(selectedUser);
            onAuthSuccess();
        } catch (err) {
            setIsLoading(false);
            onAuthError('Failed to complete authentication');
        }
    }, [selectedUser, onAuthSuccess, onAuthError]);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Log in with e-ID</Text>
                    <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                </View>

                {!error && !choosingUser && <Text style={styles.subtext}>Choose your eID provider</Text>}
                {!error && choosingUser && <Text style={styles.subtext}>Please choose an email to log in with</Text>}

                {error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <CustomButton
                            title="Retry"
                            handlePress={initializeDokobitAuth}
                            containerStyles="mt-4"
                        />
                    </View>
                ) : choosingUser ? (
                    <>
                        <View style={styles.userSelectionContainer}>
                            <Text style={styles.label}>Email</Text>
                            {users.map((user) => (
                                <TouchableOpacity
                                    key={user.uuid}
                                    style={[
                                        styles.userOption,
                                        selectedUser === user.uuid && styles.userOptionSelected,
                                    ]}
                                    onPress={() => setSelectedUser(user.uuid)}
                                >
                                    <Text style={styles.userEmail}>{user.email}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.footer}>
                            <CustomButton
                                title="Login"
                                handlePress={handleFinishLogin}
                                containerStyles="bg-primary-50"
                                textStyles="text-white"
                                isLoading={isLoading}
                            />
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.webviewContainer}>
                            {webViewHtml && !choosingUser && (
                                <WebView
                                    source={{ html: webViewHtml, baseUrl: 'https://id-sandbox.dokobit.com' }}
                                    style={styles.webview}
                                    onMessage={handleWebViewMessage}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    startInLoadingState={false}
                                    onLoadEnd={() => {
                                        setIsLoading(false);
                                    }}
                                    onError={(syntheticEvent) => {
                                        const { nativeEvent } = syntheticEvent;
                                        console.error('WebView error:', nativeEvent);
                                    }}
                                    onHttpError={(syntheticEvent) => {
                                        const { nativeEvent } = syntheticEvent;
                                        console.error('WebView HTTP error:', nativeEvent);
                                    }}
                                    originWhitelist={['*']}
                                    mixedContentMode="always"
                                    allowsInlineMediaPlayback={true}
                                    mediaPlaybackRequiresUserAction={false}
                                    thirdPartyCookiesEnabled={true}
                                    sharedCookiesEnabled={true}
                                />
                            )}
                        </View>
                    </>
                )}
            </View>
        </Modal>
    );
};

export default DokobitAuth;
