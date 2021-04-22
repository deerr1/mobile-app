import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';

export function Loading({loading}) {
    if(!loading){
        return <View/>
    }
    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <ActivityIndicator color={'black'}/>
                <Text style={styles.text}>Загрузка</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay:{
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
    },
    text:{
        marginLeft: 16,
        fontSize: 15,
        fontWeight: '500',
    }
});