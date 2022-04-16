import React from "react";
import { Alert, Text, View } from "react-native";
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";
import { UseAuth } from "../../hooks/auth";
import { Avatar } from "../Avatar";

import { styles } from "./styles";

export function Profile(){
    const {user, signOut} = UseAuth();

    function handleSignOut() {
        Alert.alert('Logout', 'Deseja sair do GamePlay?',
        [
            {
                text: "Não",
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: ()=> signOut()
            }
        ]
        )
    }

    return(
        <View style={styles.container}>

            <GestureHandlerRootView>
                <RectButton onPress={handleSignOut}>
                    <Avatar urlImage={user.avatar}/>
                </RectButton>
            </GestureHandlerRootView>

            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>
                    <Text style={styles.username}>
                        {user.firstName}
                    </Text>
                </View>

                <Text style={styles.message}>Hoje é dia de vitória</Text>
            </View>
            
        </View>
    )
}