import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import {MainPage} from '../views/MainPage'


const MainStack = createStackNavigator();
const MainDrawer = createDrawerNavigator();

export function MainStakNavigator({navigation}) {
  return (
      <MainDrawer.Navigator screenOptions={{headerShown:true}} >
        <MainDrawer.Screen name={'Главная'} component={MainPage}/>
      </MainDrawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});
