import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import { Heading } from '../component/Heading';
import axios from 'axios';
import {BASE_URL} from '../config/index'
import { FlatList } from 'react-native-gesture-handler';
import { TextFields } from '../component/TextFields';
import { FormButton } from '../component/FormButton';




export function HistoryPage() {

    const [selectedItem, setSelectedItem] = React.useState(null);
    const [dataLi, setDataLi] = React.useState(null);
    const [suma, setSuma] = React.useState(null);
    const [date, setDate] = React.useState(null);


    let OpenItem = async () => {
        setSelectedItem('True')
        const {data} = await axios.get(BASE_URL+'product/check/')
        console.log(data)
        setDataLi(data.data.data)
        setSuma(data.data.sum)
        setDate('29.04.2021')


    }


    if(selectedItem=='True'){
        return (
            <View>
                <View style={styles.container}>
                    <Heading style={{fontSize: 28}}>
                        История
                    </Heading>
                </View>
                <View style={styles.titleContainer}>
                    <Text>Тип</Text>
                    <Text>Название</Text>
                    <View style={{flexDirection:'row'}}>  
                        <Text style={{paddingRight: 10}}>Кол-во</Text>
                        <Text>Цена</Text>
                    </View>
                </View>
                <FlatList
                style={{height: '55%'}}
                data={dataLi}
                renderItem={({item}) => {
                    return <TextFields date={item}/>
                }}
                keyExtractor={item => item.name}
                />
                <View style={styles.containerDate}>
                    <Text>Дата: {date}</Text>
                    <Text>Сумма: {suma}</Text>
                </View>
                <View style={{alignItems:'center', paddingVertical:30}}>
                    <FormButton style={styles.buttons} title={'Назад'} onPress={()=> setSelectedItem(null)}/>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Heading style={{fontSize: 28}}>
                История
            </Heading>
            <View style={styles.titleContainer}>
                <Text>Дата</Text>
                <Text>Сумма</Text>
            </View>
            <TouchableOpacity onPress={()=>{
                OpenItem()
            }}>
                <View style={styles.date}>
                    <Text>29.04.2021</Text>
                    <Text style={{paddingLeft:60}}>1936.10</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20
    },
    titleContainer:{
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingVertical:10,
        paddingHorizontal: 10,
        width: '100%',
    },
    date:{
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingVertical:10,
        paddingHorizontal: 40,
        width: '100%',
    },
    buttons: {
        width: 140,
        height: 40,
    },
    containerDate:{
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: "space-around"
    }, 
});