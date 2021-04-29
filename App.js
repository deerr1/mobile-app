import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

import {AuthStakNavigator} from './src/navigators/AuthStakNavigator'
import {AuthContext} from './src/context/AuthContext'
import { MainStakNavigator } from './src/navigators/MainStackNavigator';
import  { useAuth }  from './src/hooks/useAuth';
import { UserContext } from './src/context/UserContext';
import { Splash } from './src/views/Splash';


const RootStack = createStackNavigator();

export default function App() {
  const {auth, state} = useAuth();

  console.disableYellowBox = true
  
  function renderScreens() {
    if (state.loading) {
      return <RootStack.Screen  name={'Splash'} component={Splash}/>;
    }
    return state.user ? (
        <RootStack.Screen  name={'MainStack'}>
          {()=>(
            <UserContext.Provider value={state.user}>
              <MainStakNavigator />
            </UserContext.Provider>
          )}
        </RootStack.Screen>
        ) : (
        <RootStack.Screen  name={'AuthStack'} component={AuthStakNavigator}/>
        )
  }

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{
          headerShown:false,
          animationEnable:false
          }}>
          {renderScreens()}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});
