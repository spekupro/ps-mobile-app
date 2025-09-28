import React from 'react';
import { Tabs } from 'expo-router';
import { View, Image, ImageSourcePropType } from 'react-native';
import icons from '@/src/common/constants/icons';

interface TabIconProps {
    icon: ImageSourcePropType;
    color: string;
    name: string;
    focused: boolean;
    styles?: string;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused, styles }) => {
    return (
        <View>
            <Image source={icon} resizeMode="contain" tintColor={color}
                   className={`w-6 h-6 ${styles ? styles : ''}`} />
            {/*<Text className={`${focused ? 'font-bold' : 'font-light'} text-xs`}>{name}</Text>*/}
        </View>
    );
};

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#301BB5',
                    tabBarInactiveTintColor: '#64748B',
                    tabBarLabelStyle: { fontSize: 9 },
                }}
            >
                <Tabs.Screen
                    name="orders/orders"
                    options={{
                        tabBarLabel: 'Orders',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.OrdersIcon}
                                color={color}
                                name={'Orders'}
                                focused={focused}
                            />
                        ),
                    }} />
                <Tabs.Screen
                    name="payment-links/payment-links"
                    options={{
                        tabBarLabel: 'Payment Links',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.PaymentIcon}
                                color={color}
                                name={'Payment Links'}
                                focused={focused}
                            />
                        ),
                    }} />
                <Tabs.Screen
                    name="payment-links/payment-link"
                    options={{
                        tabBarLabel: '',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.PlusIcon} color={color} name={''} focused={focused}
                                     styles={'rounded-full bg-neutral-20 mt-2 p-2 w-9 h-9'} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="products/products"
                    options={{
                        tabBarLabel: 'Products',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.StoreIcon}
                                color={color}
                                name={'Products'}
                                focused={focused}
                            />
                        ),
                    }} />
                <Tabs.Screen
                    name="profile/profile"
                    options={{
                        tabBarLabel: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.ProfileIcon}
                                color={color}
                                name={'Profile'}
                                focused={focused}
                            />
                        ),
                    }} />
            </Tabs>
        </>
    );
};

export default TabsLayout;
