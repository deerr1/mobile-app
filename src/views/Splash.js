import React from 'react';
import { StyleSheet, Image, Text, View} from 'react-native';

export function Splash(props) {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{
          uri: 'https://user-images.githubusercontent.com/21227322/31187159-01c8d592-a8ff-11e7-9386-af708a7ae9de.png',
        }} />
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    },
    image: {
      width: 250,
      height: 250,
    }
});