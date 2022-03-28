import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { theme } from "../global/styles/theme";

import { Home } from "../screens/Home";
import { SignIn } from "../screens/SignIn";

const {Navigator, Screen} = createNativeStackNavigator();

export function AuthRoutes(){
    return(
        <Navigator
            screenOptions={{
                contentStyle: {
                    backgroundColor: theme.colors.secondary100
                },
                headerShown:false,
            }}
        >
            <Screen
                name="SignIn"
                component={SignIn}
            />
            <Screen
                name="Home"
                component={Home}
            />
        </Navigator>
    )
}