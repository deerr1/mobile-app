import React from 'react';
import {createDrawerNavigator, DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import {MainPage} from '../views/MainPage'
import {AnaliticPage} from '../views/AnaliticPage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../context/AuthContext';

const MainDrawer = createDrawerNavigator();



export function MainStakNavigator({navigation}) {
  const {logout} = React.useContext(AuthContext);
  return (
      <MainDrawer.Navigator screenOptions={{headerShown:true}}
      drawerContent={props => {
        return (
          <DrawerContentScrollView style={styles.container}>
            <DrawerItem
            label="Главная"
            icon={({color, size}) => (
              <Icon
                name='home'
                color={color}
                size={size}
              />
            )}
            onPress={() => navigation.navigate('Главная')} />
            <DrawerItem
            label="Анализ данных"
            icon={({color, size}) => (
              <Icon
                name='chart-bar'
                color={color}
                size={size}
              />
            )}
            onPress={() => navigation.navigate('Анализ даннах')}/>
            <DrawerItem style={styles.bottomDrawerSection}
            label="Выход"
            icon={({color, size}) => (
              <Icon
                name='logout'
                color={color}
                size={size}
              />
            )}
            onPress={() => {logout()}} />
          </DrawerContentScrollView>
        )}}
        >
        <MainDrawer.Screen name={'Главная'} component={MainPage}/>
        <MainDrawer.Screen name={'Анализ даннах'} component={AnaliticPage}/>

      </MainDrawer.Navigator>
  );
}
// chart-bar

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopWidth:1,
    marginTop: '170%',
  }
});
