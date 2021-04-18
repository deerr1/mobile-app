import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Login} from './src/views/Login';
import {Registration} from './src/views/Registration';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Login /> */}
      <Registration />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});
