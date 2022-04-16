import React from "react";
import {
    ImageBackground,
    Text,
    View,
    FlatList
} from "react-native";
import { BorderlessButton, GestureHandlerRootView } from "react-native-gesture-handler";

import {Fontisto} from '@expo/vector-icons'
import BannerImg from '../../assets/banner.png'

import { ListDivider } from "../../components/ListDivider";
import { ListHeader } from "../../components/ListHearder";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { Member } from "../../components/Member";
import { ButtonIcon } from "../../components/ButtonIcon";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

export function AppointmentDetails(){
    const members = [
        {
            id: '1',
            username: "Henrique",
            avatar_url: "https://github.com/henrique-pignatari.png",
            status: "online",
        },
        {
            id: '2',
            username: "Sr. Porco",
            avatar_url: "https://github.com/henrique-pignatari.png",
            status: "offline",
        },
    ];

    return(
        <Background>
            <Header
                title="Detalhes"
                action={
                    <GestureHandlerRootView>
                        <BorderlessButton>
                            <Fontisto
                                name="share"
                                size={24}
                                color={theme.colors.primary}
                            />
                        </BorderlessButton>
                    </GestureHandlerRootView>
                }
            />

            <ImageBackground
                style={styles.banner}
                source={BannerImg}
            >
                <View style={styles.bannercontent}>
                    <Text style={styles.title}>
                        Lendários
                    </Text>

                    <Text style={styles.subtitle}>
                        É hoje que vamos chegar ao challenger sem perder uma partida da md10
                    </Text>
                </View>
            </ImageBackground>

            <ListHeader
                title="Jogadores"
                subtitle="Total 3"
            />
            <FlatList 
                style={styles.members}
                data={members}
                keyExtractor={item => item.id}
                renderItem={({item}) =>(
                    <Member data={item}/>
                )}
                ItemSeparatorComponent={() => <ListDivider isCentered/>}
            />

            <View style={styles.footer}>
                <ButtonIcon 
                    title="Entrar na partida"
                />
            </View>
        </Background>
    )
}