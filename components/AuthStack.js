import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from "./Signin";

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Signin"
            screenOptions={{
                headerTitleAlign: 'center',
                cardStyle: { backgroundColor: 'blue' },
                headerTintColor: 'black',
            }}
        >
            <Stack.Screen
                name="Signin"
                component={Signin}
                options={{ headerBackTitleVisible: false }}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;
