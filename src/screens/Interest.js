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
} from 'react-native';

import { storeInterest } from '../storage';

const categories = [
  'business',
  'general',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

const Category = ({ category, setSelectedCategories, selectedCategories }) => {
  const [isSelected, setIsSelected] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
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
          setIsSelected(!isSelected);
          addCategory(category, isSelected);
        }}
        style={[
          styles.addbutton,
          {
            backgroundColor: isSelected ? '#4275b7' : '#fff',
          },
        ]}>
        <Text
          style={[
            styles.text,
            { marginRight: 10, color: isSelected ? '#fff' : '#4275b7' },
          ]}>
          {isSelected ? '-' : '+'}
        </Text>
        <Text style={[styles.text, { color: isSelected ? '#fff' : '#4275b7' }]}>
          {category}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Interest = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

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
            />
          ))}
        </View>
        <Text style={styles.requiredText}>Select Atleast Two</Text>
        <TouchableOpacity
          onPress={() => storeInterest(selectedCategories)}
          disabled={selectedCategories.length < 2}
          style={styles.goNextButton}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Interest;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f6f9',
    padding: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addbutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderColor: '#4275b7',
    margin: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 17,
    color: '#4275b7',
    textTransform: 'capitalize',
  },
  categoryContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  requiredText: {
    color: '#bbb',
    margin: 10,
  },
  goNextButton: {
    backgroundColor: '#4275b7',
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
