import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export function AnaliticItem({data}) {
    return (
        <View style={styles.constainerTitle}>
            <Text>{data.name}</Text>
            <Text>{data.sum}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{

    },
    constainerTitle:{
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 18,
        justifyContent: "space-around"
    }
});