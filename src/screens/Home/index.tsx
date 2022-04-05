import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Appointment } from "../../components/Appointment";
import { Background } from "../../components/Background";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListDivider } from "../../components/ListDivider";
import { ListHeader } from "../../components/ListHearder";
import { Profile } from "../../components/Profile";

import {styles} from "./styles"

type Props = {
    navigation: {
        navigate: Function;
    };
}

export function Home({navigation: {navigate}}: Props){
    const [category, setCategory] = useState('');

    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendarios',
                icon: null,
                owner: true,
            },
            category: '1',
            date: '22/06 às 21:40',
            description: 'É hoje que vamos chegar ao challenger sem perder uma partida md10'
        },
        {
            id: '2',
            guild: {
                id: '1',
                name: 'Lendarios',
                icon: null,
                owner: true,
            },
            category: '1',
            date: '22/06 às 21:40',
            description: 'É hoje que vamos chegar ao challenger sem perder uma partida md10'
        },
    ];

    function handleAppointmentCreate(){
        navigate("AppointmentCreate")
    }

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId)
    };

    function handleAppointmentDetails(){
        navigate("AppointmentDetails")
    };

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

                <ListHeader 
                    title="Partidas Agendadas" 
                    subtitle="Total 6"
                />

                <FlatList 
                    data={appointments}
                    keyExtractor={item => item.id}
                    renderItem={({item})=> (
                        <Appointment
                            onPress={handleAppointmentDetails}
                            data={item}
                        />
                    )}
                    style={styles.matches}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <ListDivider/>}
                    contentContainerStyle={{paddingBottom: 69}}
                />
        </Background>
    );
}