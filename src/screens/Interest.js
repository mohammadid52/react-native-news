/* eslint-disable react-native/no-inline-styles */
import { findIndex } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Vibration,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { storeData } from '../storage';

const categories = [
  'business',
  'general',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

const Category = ({
  category,
  setSelectedCategories,
  selectedCategories,
  setError,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1400,
      useNativeDriver: false,
    }).start();
  }, []);

  const addCategory = (name, selected) => {
    if (!selected) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      const idx = findIndex(selectedCategories, category);
      selectedCategories.splice(idx, 1);
      setSelectedCategories([...selectedCategories]);
    }
  };

  return (
    <Animated.View style={{ opacity }}>
      <TouchableOpacity
        onPress={() => {
          setError(false);
          setIsSelected(!isSelected);
          addCategory(category, isSelected);
        }}
        style={[
          styles.addbutton,
          {
            backgroundColor: isSelected ? '#4275b7' : '#fff',
          },
        ]}>
        <AntDesign
          name={isSelected ? 'minus' : 'plus'}
          color={isSelected ? '#fff' : '#4275b7'}
          size={17}
          style={{ marginRight: 5 }}
        />

        <Text style={[styles.text, { color: isSelected ? '#fff' : '#4275b7' }]}>
          {category}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Interest = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(false);

  const handlePress = () => {
    if (selectedCategories.length < 2) {
      setError(true);
      Vibration.vibrate(100);
      return;
    }
    const newUserData = {
      interest: selectedCategories,
      profileImage: null,
    };

    storeData(newUserData);
    navigation.navigate('ProfilePicker');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <Category
              key={category}
              category={category}
              setSelectedCategories={setSelectedCategories}
              selectedCategories={selectedCategories}
              setError={setError}
            />
          ))}
          <Text
            style={[
              styles.requiredText,
              { color: error ? '#eb596e' : '#bbb' },
            ]}>
            Select Atleast Two Interests
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={handlePress}
            // disabled={selectedCategories.length < 2}
            style={styles.goNextButton}>
            <Text style={styles.buttonText}>Next</Text>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              color={'#fff'}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Interest;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addbutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#4275b7',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    color: '#4275b7',
    textTransform: 'capitalize',
    fontFamily: 'Steradian Light',
  },
  categoryContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 40,
  },
  requiredText: {
    color: '#bbb',
    fontFamily: 'Steradian Medium',
    margin: 10,
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
