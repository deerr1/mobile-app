import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '../config/index'
import { createAction } from '../config/createAction';
import { sleep } from '../untils/sleep';


export function useAuth() {
const [state, dispatch] = React.useReducer((state, action)=>{
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          loading: false,
          user: {...action.payload}
        };
      case 'REMOVE_USER':
        return {
          ...state,
          user: undefined
        };
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload,
        }
      default:
        return state;
    }
  },{
    user: undefined,
    loading: true
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
      await AsyncStorage.setItem('user', JSON.stringify(user))
      dispatch(createAction('SET_USER', user));
    },
    logout: async () => {
      await AsyncStorage.removeItem('user')
      dispatch(createAction('REMOVE_USER'))
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
  React.useEffect(()=>{
    sleep(1000).then(()=>{
      AsyncStorage.getItem('user').then( user => {
        console.log('user', user);
        if (user !== null){
          dispatch(createAction('SET_USER', JSON.parse(user)));
        } else {
          dispatch(createAction('SET_LOADING', false))
        }
    })
    });
  },[]);
  return {auth, state};
}