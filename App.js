import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

import {BASE_URL} from './src/config/index'
import {AuthStakNavigator} from './src/navigators/AuthStakNavigator'
import {AuthContext} from './src/context/AuthContext'
import { createAction } from './src/config/createAction';
import { MainStakNavigator } from './src/navigators/MainStackNavigator';


const RootStack = createStackNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer((state, action)=>{
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: {...action.payload}
        };
      default:
        return state;
    }
  },{
    user: undefined
  })

  const auth = React.useMemo(() => ({
    login: async (email, password) => {
      const {data} = await axios.post(BASE_URL+'rest-auth/login/',{
        'email':email,
        'password': password
      })
      const user = {
        token:data.key,
      }
      dispatch(createAction('SET_USER', user))
    },
    logout: () => {
      console.log('logout');
    },
    registration: async (firstName, secondName, lastName, email, password) => {
      await axios.post(BASE_URL+'rest-auth/registration/', {
        'email':email,
        'password1':password,
        'password2': password,
        'first_name': firstName,
        'second_name': secondName,
        'last_name': lastName
      });
    }
  }),
  [],
  );

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{
          headerShown:false,
          animationEnable:false
          }}>
          {
            state.user ? <RootStack.Screen  name={'MainStack'} component={MainStakNavigator}/> :
            <RootStack.Screen  name={'AuthStack'} component={AuthStakNavigator}/>
          }
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
