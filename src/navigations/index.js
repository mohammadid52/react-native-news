import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Interest, Content, ProfilePicker } from '../screens';
import { clearAll_TEST, readData } from '../storage';

const Stack = createStackNavigator();

const NavigationStack = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    readData().then((data) => {
      setUserData(data);
    });
    // clearAll_TEST();
  }, [userData]);

  const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }) => ({
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    }),
  };

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Home'}>
      {userData?.interest?.length && userData?.profileImage !== null ? (
        <>
          <Stack.Screen
            name={'Home'}
            component={Home}
            options={horizontalAnimation}
          />
          <Stack.Screen
            name={'Content'}
            component={Content}
            options={horizontalAnimation}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={'Interest'}
            component={Interest}
            options={horizontalAnimation}
          />
          <Stack.Screen
            name={'ProfilePicker'}
            component={ProfilePicker}
            options={horizontalAnimation}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default NavigationStack;
