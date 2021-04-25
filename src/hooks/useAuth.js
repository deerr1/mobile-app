import React from 'react';
import axios from 'axios';

import {BASE_URL} from '../config/index'
import { createAction } from '../config/createAction';


export function useAuth() {
const [state, dispatch] = React.useReducer((state, action)=>{
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: {...action.payload}
        };
      case 'REMOVE_USER':
        return {
          ...state,
          user: undefined
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
  return {auth, state};
}