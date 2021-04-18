import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function ErrorMessage({error}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{error}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#ff5959',
        fontWeight: 'bold',
  },
  container: {
    paddingVertical: 0,
  }
});