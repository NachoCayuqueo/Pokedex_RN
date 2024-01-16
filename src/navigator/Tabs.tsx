import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Navigator} from './Navigator';
import {SearchScreen} from '../screens/SearchScreen';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'white'}}
      screenOptions={{
        headerShown: false, //oculta titulo default
        tabBarActiveTintColor: '#5856d6',
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? 0 : 10,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Navigator}
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({color}) => (
            <Icon name="list-outline" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Búsqueda',
          tabBarIcon: ({color}) => (
            <Icon name="search-outline" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
