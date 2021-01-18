/* eslint-disable react-native/no-inline-styles */
import { map } from 'lodash';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AvatarList from '../constants/avatars';
import { storeData } from '../storage';
import * as keys from '../keys';

const ProfilePicker = ({ navigation }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const Profiles = ({ avatar }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelectedIdx(avatar.id)}
        style={{ transform: [{ scale: avatar.id === selectedIdx ? 1.3 : 1 }] }}>
        <Image source={avatar.img} style={styles.img} />
      </TouchableOpacity>
    );
  };

  const handleNext = () => {
    storeData(selectedIdx, keys.PROFILE_IMAGE);
    navigation.navigate('Home');
  };

  const goBack = () => navigation.navigate('Interest');

  return (
    <View style={styles.container}>
      <View style={{ padding: 10 }}>
        <Text style={styles.header}>2. Select Profile</Text>
        <View style={styles.avatarContainer}>
          {map(AvatarList, (avatar) => (
            <Profiles key={avatar.id} avatar={avatar} />
          ))}
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={goBack}
            style={[
              styles.goNextButton,
              { backgroundColor: '#fff', justifyContent: 'flex-start' },
            ]}>
            <MaterialIcons
              name={'keyboard-arrow-left'}
              color={'#4275b7'}
              size={25}
            />
            <Text style={[styles.buttonText, { color: '#4275b7' }]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.goNextButton}>
            <Text style={styles.buttonText}>Next</Text>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              color={'#fff'}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfilePicker;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    fontFamily: 'Steradian Medium',
    fontSize: 25,
    color: '#000',
  },
  container: {
    backgroundColor: '#fff',
    padding: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    margin: 20,
    marginRight: 30,
  },
  goNextButton: {
    backgroundColor: '#4275b7',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'Steradian Medium',
  },
});
