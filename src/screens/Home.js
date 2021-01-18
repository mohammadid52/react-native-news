/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useUser } from '../context';
import AvatarList from '../constants/avatars';
import { find } from 'lodash';

const Home = () => {
  const { profileImage } = useUser();
  console.log(profileImage);

  const imagePath = find(AvatarList, { id: 1 }).img;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image
            source={imagePath}
            style={{ height: 45, width: 45, resizeMode: 'contain' }}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingVertical: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
