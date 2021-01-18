import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './navigations';
import { UserProvider } from './context';

LogBox.ignoreAllLogs(); // ignore all log messages

const App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <StatusBar hidden />
        <Navigation />
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
