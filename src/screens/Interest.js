/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

const { height, width } = Dimensions.get('screen');

const categories = [
  'business',
  'general',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

const Category = ({ category }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => setIsSelected(!isSelected)}
      style={[
        styles.addbutton,
        { backgroundColor: isSelected ? '#4275b7' : '#fff' },
      ]}>
      <Text
        style={[
          styles.text,
          { marginRight: 10, color: isSelected ? '#fff' : '#4275b7' },
        ]}>
        +
      </Text>
      <Text style={[styles.text, { color: isSelected ? '#fff' : '#4275b7' }]}>
        {category}
      </Text>
    </TouchableOpacity>
  );
};

const Interest = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <Category key={category} category={category} />
          ))}
        </View>
        <Text style={styles.requiredText}>Select Atleast Two</Text>
        <TouchableOpacity style={styles.goNextButton}>
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
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
