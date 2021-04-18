import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function FormButton({title, style, onPress}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4287f5',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 20,
  },
  text: {
      color: 'white',
      fontWeight: '500',
      fontSize: 16,
  }
});
