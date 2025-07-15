import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '@/components/CustomButton';
import { EidUser } from '@/types/eid.interface';

interface DokobitUserSelectionProps {
    users: EidUser[];
    onUserSelect: (userUuid: string) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const DokobitUserSelection: React.FC<DokobitUserSelectionProps> = ({
    users,
    onUserSelect,
    onCancel,
    isLoading = false
}) => {
    const [selectedUserUuid, setSelectedUserUuid] = useState<string>(users[0]?.uuid || '');

    const handleSubmit = () => {
        if (!selectedUserUuid) {
            Alert.alert('Error', 'Please select a user to continue');
            return;
        }
        onUserSelect(selectedUserUuid);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Choose Account</Text>
                    <Text style={styles.subtitle}>
                        Multiple accounts are associated with your eID. Please choose which account to log in with.
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Email Address</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedUserUuid}
                            onValueChange={setSelectedUserUuid}
                            style={styles.picker}
                            enabled={!isLoading}
                        >
                            {users.map((user) => (
                                <Picker.Item
                                    key={user.uuid}
                                    label={user.email}
                                    value={user.uuid}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="Continue"
                        handlePress={handleSubmit}
                        containerStyles="bg-primary-50 mb-4"
                        textStyles="text-neutral"
                        isLoading={isLoading}
                    />
                    <CustomButton
                        title="Cancel"
                        handlePress={onCancel}
                        containerStyles="border-2 border-neutral-30"
                        textStyles="text-neutral-60"
                        isLoading={isLoading}
                    />
                </View>
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
    content: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
        paddingTop: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#1B0547',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 12,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: '#F9FAFB',
    },
    picker: {
        height: 50,
    },
    buttonContainer: {
        marginTop: 'auto',
        paddingBottom: 20,
    },
});

export default DokobitUserSelection;