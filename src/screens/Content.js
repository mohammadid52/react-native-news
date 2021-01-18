/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';

const { height } = Dimensions.get('screen');

const Content = () => {
  const { params } = useRoute();

  return (
    <View style={styles.container}>
      <View style={{ height: 50 }} />
      <View style={styles.mainContent}>
        <Image
          source={{ uri: params.urlToImage }}
          style={{ height: 240, resizeMode: 'cover', borderRadius: 30 }}
        />
        <Text style={styles.title}>{params.title}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text style={styles.article__details}>{params.author}</Text>
        <Text style={styles.article__details}>
          {moment(params.publishedAt).format('ll')}
        </Text>
      </View>
      <View>
        <Text style={styles.article__content}>{params.description}</Text>
      </View>
    </View>
  );
};

export default Content;

Content.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [`item.${item.url}.photo`];
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    height,
    paddingVertical: 50,
    backgroundColor: '#FAFAFA',
    flexShrink: 1,
  },
  title: {
    fontFamily: 'Steradian Bold',
    fontSize: 21,
    marginVertical: 10,
    marginTop: 20,
    color: '#232931',
  },
  article__details: {
    fontFamily: 'Steradian Regular',
    color: '#A9A9A9',
  },
  article__content: {
    fontFamily: 'Steradian Regular',
    fontSize: 18,
  },
});
