import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from "./Profile";
import ChannelList from "./ChannelList";
import { MaterialIcons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
    return (
        <MaterialIcons
            name={name}
            size={26}
            color={focused ? 'green' : 'blue'}
        />
    );
};

const MainTab = ({ navigation, route }) => {
    useEffect(() => {
        const title = getFocusedRouteNameFromRoute(route) ?? 'Channels';
        navigation.setOptions({
            headerTitle: title,
            headerRight: () =>
                title === 'Channels' && (
                    <MaterialIcons
                        name="add"
                        size={26}
                        style={{ margin: 10 }}
                        onPress={() => navigation.navigate('Channel Creation')}
                    />
                ),
        });
    }, [route]);

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'green',
            }}
        >
            <Tab.Screen
                name="Channels"
                children={()=><ChannelList user={route.params.user}/>}
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: focused ? 'chat-bubble' : 'chat-bubble-outline',
                        }),
                }}
            />
            <Tab.Screen
                name="Profile"
                children={()=><Profile user={route.params.user}/>}
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: focused ? 'person' : 'person-outline',
                        }),
                }}
                initialParams={{'key':'value'}}
            />
        </Tab.Navigator>
    );
};

export default MainTab;
