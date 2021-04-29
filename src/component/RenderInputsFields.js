import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Input } from './Input';
import Swipeable from 'react-native-gesture-handler/Swipeable'

export function RenderInputsFields({data, index, handleDelete, setTypeProduct, setTypeName, setTypeQuantity, setTypePrice}) {
    const rightSwipe = () => {
        return (
            <TouchableOpacity onPress={handleDelete} activeOpacity={0.4}>
                <View style={styles.deleteBox}>
                    <Text>Удалить</Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    return (
        <Swipeable
            renderRightActions={rightSwipe}
        >
            <View style={styles.container}>
                <View style={styles.itemInput}>
                    <Input value={data.type_of_product} onChangeText={text=>setTypeProduct(index, text)} style={{width: 85, height: 40}}></Input>
                </View>
                <View style={styles.itemInput}>
                    <Input value={data.name} onChangeText={text=>setTypeName(index, text)} style={{width: 145, height: 40}}></Input>
                </View>
                <View style={styles.itemInput}>
                    <Input value={data.quantity} onChangeText={text=>setTypeQuantity(index, text)} style={{width: 60, height: 40}}></Input>
                </View>
                <View style={styles.itemInput}>
                    <Input value={data.price} onChangeText={text=>setTypePrice(index, text)} style={{width: 70, height: 40}}></Input>
                </View>
            </View>
        </Swipeable>
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