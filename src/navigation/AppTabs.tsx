import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../screens/app/HomeScreen';
import PerfilScreen from '../screens/app/PerfilScreen';
import TrilhaListScreen from '../screens/app/TrilhaListScreen';

export type AppTabsParamList = {
  Home: undefined;
  Trilhas: undefined;
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<AppTabsParamList>();

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Trilhas" component={TrilhaListScreen} options={{ title: 'Trilhas' }} />
      <Tab.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
