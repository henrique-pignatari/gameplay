import React, { useState, useEffect } from "react";
import {
    ImageBackground,
    Text,
    View,
    FlatList,
    Alert,
    Share,
    Platform
} from "react-native";
import { BorderlessButton, GestureHandlerRootView } from "react-native-gesture-handler";
import * as Linking from 'expo-linking'

import {Fontisto} from '@expo/vector-icons'
import BannerImg from '../../assets/banner.png'

import { ListDivider } from "../../components/ListDivider";
import { ListHeader } from "../../components/ListHearder";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { Member, MemberProps } from "../../components/Member";
import { ButtonIcon } from "../../components/ButtonIcon";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { AppointmentProps } from "../../components/Appointment";
import { api } from "../../services/api";
import { Load } from "../../components/Load";

type Props = {
    route: {
        params: {
            appointmentSelected : AppointmentProps;
        }
    }
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
}

export function AppointmentDetails({route:{params:{appointmentSelected}}}: Props){
    const [widget,setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true)

    async function fetchGuildWidget() {
        try{
            const response = await api.get(`/guilds/${appointmentSelected.guild.id}/widget.json`);
            setWidget(response.data);
        }catch{
            Alert.alert("Verifique as configurações do servidor. Será que o widget está habilitado?");
        } finally{
            setLoading(false);
        }
    }

    function handleShareInvitation(){
        const message = Platform.OS === 'ios' ? 
        `Junte-se a ${appointmentSelected.guild.name}`
        : widget.instant_invite;
        Share.share({
            message,
            url: widget.instant_invite
        })
    }

    function handleOpenGuild(){
        Linking.openURL(widget.instant_invite)
    }

    useEffect(()=>{
        fetchGuildWidget();
    },[])

    return(
        <Background>
            <Header
                title="Detalhes"
                action={
                    appointmentSelected.guild.owner &&
                    <GestureHandlerRootView>
                        <BorderlessButton onPress={handleShareInvitation}>
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
                        { appointmentSelected.guild.name}
                    </Text>

                    <Text style={styles.subtitle}>
                        {appointmentSelected.description}
                    </Text>
                </View>
            </ImageBackground>

            {
                loading ? 
                <Load/>
                :
                <>
                    <ListHeader
                        title="Jogadores"
                        subtitle={`Total ${widget.members.length}`}
                    />
                    <FlatList 
                        style={styles.members}
                        data={widget.members}
                        keyExtractor={item => item.id}
                        renderItem={({item}) =>(
                            <Member data={item}/>
                        )}
                        ItemSeparatorComponent={() => <ListDivider isCentered/>}
                    />
                </>
            }
            {
                appointmentSelected.guild.owner &&
                <View style={styles.footer}>
                    <ButtonIcon 
                        title="Entrar na partida"
                        onPress={handleOpenGuild}
                    />
                </View>
            }
        </Background>
    )
}