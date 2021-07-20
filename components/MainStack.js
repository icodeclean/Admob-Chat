import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Channel from "./Channel";
import ChannelCreation from "./ChannelCreation";
import MainTab from './MainTab';

const Stack = createStackNavigator();

const MainStack = ({user}) => {

    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: 'black',
                cardStyle: { backgroundColor: 'blue'},
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen name="Main" component={MainTab} initialParams={{user: user}}/>
            <Stack.Screen name="Channel Creation" component={ChannelCreation} />
            <Stack.Screen name="Channel" component={Channel} />
        </Stack.Navigator>
    );
}

export default MainStack;
