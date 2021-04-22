import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {Heading} from '../component/Heading';
import {Input} from '../component/Input';
import {FormButton} from '../component/FormButton';
import {TextButton} from '../component/TextButton';
import {ErrorMessage} from '../component/ErrorMessage';
import { AuthContext } from '../context/AuthContext';
import { Loading } from '../component/Loading';

export function Registration({navigation}) {
  const {registration} = React.useContext(AuthContext);
  const [errors, setErrors] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [secondName, setSecondName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Heading style={styles.title}>Регистрация</Heading>
        <ErrorMessage error={errors}/>
        <Input style={styles.input} placeholder={'Имя'} keyboardType={'default'}  value={firstName} onChangeText={setFirstName}/>
        <Input style={styles.input} placeholder={'Фамилия'} keyboardType={'default'}  value={secondName} onChangeText={setSecondName}/>
        <Input style={styles.input} placeholder={'Отчество'} keyboardType={'default'}  value={lastName} onChangeText={setLastName}/>
        <Input style={styles.input} placeholder={'Email'} keyboardType={'email-address'} value={email} onChangeText={setEmail}/>
        <Input style={styles.input} placeholder={'Пароль'} keyboardType={'default'} secureTextEntry value={password} onChangeText={setPassword}/>
        <FormButton title={'Зарегистрироваться'} style={styles.loginButton} onPress={async () => {
          try {
            setLoading(true);
            await registration(firstName, secondName, lastName, email, password);
            navigation.navigate('Login');
          } catch(e){
            setLoading(false);
            var data = JSON.parse(e.response.request._response);
            for(var key in data){
              if(key=="email"){
                if(data[key]=="Это поле не может быть пустым."){
                  setErrors('Email: '+data[key]);
                  break;
                }else{
                  setErrors(data[key]);
                  break;
                }
              }
              if(key=="password1"){
                if(data[key]=="Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов."){
                  setErrors(data[key]);
                  break;
                }else{
                  setErrors('Пароль: '+data[key]);
                  break;
                }
              }
              if(key=="first_name"){
                setErrors('Имя: '+data[key]);
                break;
              }
              if(key=="second_name"){
                setErrors('Фамилия: '+data[key]);
                break;
              }
              if(key=="last_name"){
                setErrors('Отчество: '+data[key]);
                break;
              }
              break;
            }
          }
        }}/>
      </View>
      <Loading loading={loading}/>
    </ScrollView>
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
