import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './navigations';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
