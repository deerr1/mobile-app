import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Input } from './Input';
import Swipeable from 'react-native-gesture-handler/Swipeable'

export function TextFields({date}){
    
    return (
        
        <View style={styles.container}>
            <View style={styles.itemInput}>
                <Text  style={{width: 85, height: 40}}>{date.type_of_product}</Text>
            </View>
            <View style={styles.itemInput}>
                <Text  style={{width: 145, height: 40}}>{date.name}</Text>
            </View>
            <View style={styles.itemInput}>
                <Text  style={{width: 60, height: 40}}>{date.quantity}</Text>
            </View>
            <View style={styles.itemInput}>
                <Text  style={{width: 70, height: 40}}>{date.price}</Text>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    itemInput:{
        paddingLeft:1
    },
    deleteBox:{
        backgroundColor: 'rgb(255, 74, 74)',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height:40
    }
});