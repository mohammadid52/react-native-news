import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Interest, Content } from '../screens';
import { readInterest } from '../storage';

const Stack = createStackNavigator();

const NavigationStack = () => {
  const [showCategories, setShowCategories] = useState(true);

  useEffect(() => {
    readInterest().then((interest) => {
      if (interest !== null) {
        setShowCategories(false);
      } else {
        setShowCategories(true);
      }
    });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Interest'}>
      {!showCategories ? (
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
