import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Interest, Content } from '../screens';

const Stack = createStackNavigator();

const interest = false;

const NavigationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Interest'}>
      {interest ? (
        <>
          <Stack.Screen name={'Home'} component={Home} />
          <Stack.Screen name={'Content'} component={Content} />
        </>
      ) : (
        <Stack.Screen name={'Interest'} component={Interest} />
      )}
    </Stack.Navigator>
  );
};

export default NavigationStack;
