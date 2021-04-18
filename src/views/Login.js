import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Heading} from '../component/Heading';
import {Input} from '../component/Input';
import {FormButton} from '../component/FormButton';
import {TextButton} from '../component/TextButton';
import {ErrorMessage} from '../component/ErrorMessage';

export function Login() {
  return (
    <View style={styles.container}>
      <Heading style={styles.title}>Авторизация</Heading>
      <ErrorMessage error={''}/>
      <Input style={styles.input} placeholder={'Email'} keyboardType={'email-address'}/>
      <Input style={styles.input} placeholder={'Пароль'} keyboardType={'default'} secureTextEntry />
      <FormButton title={'Войти'} style={styles.loginButton} onPress={() => {}}/>
      <TextButton title={'Регистрация'} onPress={() => {}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 120,
    padding: 20,
  },
  input:{
    marginVertical: 8,
  },
  title: {
    marginBottom: 32,
  },
  loginButton: {
    marginVertical: 16,
  }
});
