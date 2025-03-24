import React from 'react';
import { Tabs } from 'expo-router';
import { View, Image, ImageSourcePropType } from 'react-native';
import icons from '@/constants/icons';

interface TabIconProps {
    icon: ImageSourcePropType;
    color: string;
    name: string;
    focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
    return (
        <View>
            <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
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
                }}
            >
                <Tabs.Screen
                    name="products"
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
                    name="orders"
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
                    name="profile"
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
