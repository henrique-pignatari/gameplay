import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { theme } from "../global/styles/theme";

import { Home } from "../screens/Home";
import { AppointmentDetails } from "../screens/AppointmentDetails";
import { AppointmentCreate } from "../screens/AppointmentCreate";

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes(){
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
                name="Home"
                component={Home}
            />
            <Screen
                name="AppointmentDetails"
                component={AppointmentDetails}
            />
            <Screen
                name="AppointmentCreate"
                component={AppointmentCreate}
            />
        </Navigator>
    )
}