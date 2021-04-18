import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function TextButton({title, style, onPress}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
  },
  text: {
      color: '#4287f5',
      fontWeight: '500',
      fontSize: 14,
  }
});
