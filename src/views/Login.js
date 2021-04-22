import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {Heading} from '../component/Heading';
import {Input} from '../component/Input';
import {FormButton} from '../component/FormButton';
import {TextButton} from '../component/TextButton';
import {ErrorMessage} from '../component/ErrorMessage';
import { AuthContext } from '../context/AuthContext';
import { Loading } from '../component/Loading';

export function Login({navigation}) {
  const {login} = React.useContext(AuthContext);
  const [errors, setErrors] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  return (
    <View style={{height: '100%'}}>
    <ScrollView >
      <View style={styles.container}>
          <Heading style={styles.title}>Авторизация</Heading>
          <ErrorMessage error={errors}/>
          <Input style={styles.input} placeholder={'Email'} keyboardType={'email-address'} value={email} onChangeText={setEmail}/>
          <Input style={styles.input} placeholder={'Пароль'} keyboardType={'default'} secureTextEntry value={password} onChangeText={setPassword}/>
          <FormButton title={'Войти'} style={styles.loginButton} onPress={async () => {
            try{
              setLoading(true)
              await login(email, password);
            } catch(e){
              setLoading(false)
              var data = JSON.parse(e.response.request._response);
              for(var key in data){
                if(data[key]=="Должно включать \"email\" и \"password\"." || key=="password"){
                  setErrors('Все поля должны быть заполнены.');
                  break;
                }
                else{
                  setErrors(data[key]);
                  break;
                }
              }
              // setErrors(e.response.request._response)
              console.log(e.response.request._response)
            }
          }}/>
        <TextButton title={'Регистрация'} onPress={() => {navigation.navigate('Registration')}}/>
      </View>
    </ScrollView>
      <Loading loading={loading}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 150,
    padding: 20,
    height: '100%'
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
