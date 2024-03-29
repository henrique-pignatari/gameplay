import React, { useState } from "react";
import { 
    Text,
    View,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";

import {Feather} from "@expo/vector-icons"

import { CategorySelect } from "../../components/CategorySelect";
import { Background } from "../../components/Background";
import { SmallInput } from "../../components/SmallInput";
import { GuildIcon } from "../../components/GuildIcon";
import { TextArea } from "../../components/TextArea";
import { Header } from "../../components/Header";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { Button } from "../../components/Button";
import { ModalView } from "../../components/ModalView";
import { Guilds } from "../Guilds";
import { GuildProps } from "../../components/Guild";

import uuid from 'react-native-uuid'
import AsyncStorage  from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { useNavigation } from "@react-navigation/native";

type Props = {
    navigation: {
        navigate: Function;
    };
}

export function AppointmentCreate({navigation: {navigate}}:Props){
    const [category, setCategory] = useState('');
    const [openGuildsModal, setOpenGuildsModal] = useState(false);
    const [guild,setGuild] = useState<GuildProps>({} as GuildProps);

    const [day,setDay] = useState('');
    const [month,setMonth] = useState('');
    const [hour,setHour] = useState('');
    const [minute,setMinute] = useState('');
    const [description,setDescription] = useState('');

    function handleOpenGuilds(){
        setOpenGuildsModal(true)
    };

    function handleCloseGuilds(){
        setOpenGuildsModal(false)
    };

    function handleGuildSelect(guildSlected: GuildProps){
        setGuild(guildSlected);
        setOpenGuildsModal(false);
    };

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId)
    };

    async function handleSave(){
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description,
        };

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        );

        navigate('Home')
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
            style={styles.container} 
        >
            <Background>
                <ScrollView>
                    <Background>
                        <Header
                            title="Agendar partida"
                        />

                        <Text style={[
                            styles.label,
                            {marginLeft: 24, marginTop: 36, marginBottom: 18}]}
                        >
                            Categoria
                        </Text>

                        <CategorySelect
                            hasCheckBox
                            setCategory={handleCategorySelect}
                            categorySelected={category}
                        />

                        <View style={styles.form}>
                            <GestureHandlerRootView>
                                <RectButton onPress={handleOpenGuilds}>
                                    <View style={styles.select}>
                                        {
                                            guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon}/> :
                                            <View style={styles.image}/>
                                        }

                                        <View style={styles.selectBody}>
                                            <Text style={styles.label}>
                                                { guild.name ? guild.name : 'Selecione um servidor'}
                                            </Text>
                                        </View>

                                        <Feather
                                            name="chevron-right"
                                            color={theme.colors.heading}
                                            size={18}
                                        />
                                    </View>
                                </RectButton>
                            </GestureHandlerRootView>

                            <View style={styles.field}>
                                <View>
                                    <Text style={[styles.label, {marginBottom: 12}]}>
                                        Dia e mês
                                    </Text>

                                    <View style={styles.columm}>
                                        <SmallInput 
                                            maxLength={2}
                                            onChangeText={setDay}
                                        />
                                        <Text style={styles.divider}>
                                            /
                                        </Text>
                                        <SmallInput 
                                            maxLength={2}
                                            onChangeText={setMonth}
                                        />
                                    </View>
                                </View>

                                <View>
                                    <Text style={[styles.label, {marginBottom: 12}]}>
                                        Hora e minuto
                                    </Text>

                                    <View style={styles.columm}>
                                        <SmallInput 
                                            maxLength={2}
                                            onChangeText={setHour}    
                                        />
                                        <Text style={styles.divider}>
                                            :
                                        </Text>
                                        <SmallInput 
                                            maxLength={2}
                                            onChangeText={setMinute}
                                        />
                                    </View>
                                </View>          
                            </View>

                            <View style={[styles.field, {marginBottom: 12}]}>
                                <Text style={styles.label}>
                                    Descrição
                                </Text>

                                <Text style={styles.caracteresLimit}>
                                    Max 100 caracteres
                                </Text>
                            </View>
                            
                            <TextArea
                                multiline
                                maxLength={100}
                                numberOfLines={5}
                                autoCorrect={false}
                                onChangeText={setDescription}
                            />
                            <View style={styles.footer}>
                                <Button 
                                    title="Agendar"
                                    onPress={handleSave}
                                />
                            </View>
                        </View>
                    </Background>
                </ScrollView>
            </Background>
            
            <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
                <Guilds handleGuildSelect={handleGuildSelect}/>
            </ModalView>
        </KeyboardAvoidingView>
    )
}