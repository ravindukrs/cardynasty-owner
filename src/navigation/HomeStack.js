import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ServiceScreen from '../screens/ServiceScreen';
import MyVehicleScreen from '../screens/MyVehicleScreen';
import AddVehicleScreen from '../screens/AddVehicleScreen';
import ReminderScreen from '../screens/ReminderScreen';
import HistoryScreen from '../screens/HistoryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import RepairTimelineScreen from '../screens/RepairTimelineScreen';

import {Icon} from 'react-native-elements'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
    return (
        <Tab.Navigator
            screenOptions={
                { gestureEnabled: false }
            }
            tabBarOptions={{
                activeTintColor: 'purple',
                inactiveTintColor: 'gray',
            }}
        >
            {/* <Tab.Screen 
                name="Dashboard" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Icon
                            name="home"
                            type="material"
                            size={28}
                            color={color} />
                    ),
                }}
            /> */}
            <Tab.Screen 
                name="My Vehicles" 
                component={VehicleOwnershipStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Icon
                            name="car-side"
                            type="material-community"
                            size={28}
                            color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Reminders" 
                component={ReminderScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Icon
                            name="calendar-clock"
                            type="material-community"
                            size={28}
                            color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="History" 
                component={HistoryScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Icon
                            name="clock"
                            type="material-community"
                            size={28}
                            color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Notifications" 
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Icon
                            name="notification"
                            type="antdesign"
                            size={28}
                            color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export function VehicleOwnershipStack() {
    return (
        <Stack.Navigator
            screenOptions={
                {
                    headerShown: false,
                    gestureEnabled: true
                }
            }
        >
            <Stack.Screen name="My Vehicles" component={MyVehicleScreen} />
            <Stack.Screen name='AddVehicle' component={AddVehicleScreen} 
            options={
                {...TransitionPresets.SlideFromRightIOS,}
            }/>
            <Stack.Screen name="Add Service" component={ServiceScreen} 
            options={
                {...TransitionPresets.SlideFromRightIOS,}
            }/>
            <Stack.Screen name="View History" component={RepairTimelineScreen} 
            options={
                {...TransitionPresets.SlideFromRightIOS,}
            }/>
        </Stack.Navigator>
    );
}

export default function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={
                {
                    headerShown: false
                }
            }
        >
            <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
    );
}

