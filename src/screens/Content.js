import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Content = () => {
  const { params } = useRoute();
  console.log(params);

  return (
    <View>
      <Text>Content</Text>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({});
