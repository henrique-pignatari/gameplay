import React, { useState, useCallback } from "react";
import { FlatList, View } from "react-native";

import { Appointment, AppointmentProps } from "../../components/Appointment";
import { Background } from "../../components/Background";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListDivider } from "../../components/ListDivider";
import { ListHeader } from "../../components/ListHearder";
import { Profile } from "../../components/Profile";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {styles} from "./styles"
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { Load } from "../../components/Load";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
    navigation: {
        navigate: Function;
    };
}

export function Home({navigation: {navigate}}: Props){
    const [category, setCategory] = useState('');
    const [appointments,setAppointments] = useState<AppointmentProps[]>([]);
    const [loading, setLoading] = useState(true)

    function handleAppointmentCreate(){
        navigate("AppointmentCreate")
    }

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId)
    };

    function handleAppointmentDetails(appointmentSelected: AppointmentProps){
        navigate("AppointmentDetails",{appointmentSelected})
    };

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if(category){
            setAppointments(storage.filter(item =>{
                return item.category === category
            }))
        }else{
            setAppointments(storage);
        }

        setLoading(false);
    };

    useFocusEffect(useCallback(()=>{
        loadAppointments();  
    },[category]))

    return(
        <Background>
            <View style={styles.header}>
                <Profile/>
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>
            <CategorySelect 
                categorySelected={category}
                setCategory={handleCategorySelect}
            />

               {
                loading ? 
                <Load/>
                :
                <>
                    <ListHeader 
                        title="Partidas Agendadas" 
                        subtitle={`Total ${appointments.length}`}
                    />

                    <FlatList 
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({item})=> (
                            <Appointment
                                data={item}
                                onPress={() => handleAppointmentDetails(item)}
                            />
                        )}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <ListDivider/>}
                        contentContainerStyle={{paddingBottom: 69}}
                    />
                </>
                }
        </Background>
    );
}