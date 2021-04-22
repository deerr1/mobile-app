import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import {Login} from '../views/Login';
import {Registration} from '../views/Registration';

const AuthStack = createStackNavigator();

export function AuthStakNavigator() {
  return (
      <AuthStack.Navigator screenOptions={{headerShown:false}} mode={'modal'}>
        <AuthStack.Screen name={'Login'} component={Login}/>
        <AuthStack.Screen name={'Registration'} component={Registration}/>
      </AuthStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});
