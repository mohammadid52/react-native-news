import React, { useEffect, useState } from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { Home, Interest, Content, ProfilePicker } from '../screens';
import { readData } from '../storage';
import { useUser } from '../context';
import * as keys from '../keys';

const Stack = createSharedElementStackNavigator();

const NavigationStack = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    readData(keys.INTEREST).then((data) => {
      if (data.length) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
    readData(keys.PROFILE_IMAGE).then((data) => {
      if (data !== null) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, [user]);

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
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
      ) : (
        <>
          <Stack.Screen
            name={'Home'}
            component={Home}
            // options={horizontalAnimation}
          />
          <Stack.Screen
            name={'Content'}
            component={Content}
            // options={horizontalAnimation}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default NavigationStack;
