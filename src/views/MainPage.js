import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';

export function MainPage(props) {
    return (
        <View style={styles.container}>
            <Text>Здарова:D</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});