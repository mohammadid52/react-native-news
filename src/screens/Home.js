/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useUser } from '../context';
import { getAllNewsByCountry } from '../api';
import AvatarList from '../constants/avatars';
import { find, orderBy } from 'lodash';
import { FlatList } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');

const Home = () => {
  const imagePath = find(AvatarList, { id: 1 }).img;
  const [news, setNews] = useState(null);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={imagePath}
          style={{
            height: 45,
            width: 45,
            resizeMode: 'contain',
          }}
        />
        <Text style={styles.todayDate}>{moment().format('ll')}</Text>
      </View>
      <TouchableOpacity>
        <AntDesign name="search1" size={20} color={'rgba(0,0,0,0.3)'} />
      </TouchableOpacity>
    </View>
  );

  const renderTitle = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Breaking News</Text>
    </View>
  );

  useEffect(() => {
    fetch(
      'https://newsapi.org/v2/top-headlines?country=in&apiKey=29ec909f68cf4ceeb5a300eddef2cdb0',
    )
      .then((response) => response.json())
      .then((data) => {
        const ordered = orderBy(data.articles, 'publishedAt', 'desc');
        setNews(ordered);
      });
  }, []);

  const renderFirstNews = () => {
    const firstArticle = news[0];
    return (
      <View style={styles.firstCard}>
        <Image
          source={{ uri: firstArticle.urlToImage }}
          style={styles.firstCard_image}
        />
        <View style={{ padding: 20 }}>
          <Text style={styles.firstCard_title}>
            {firstArticle.title.substring(0, 60) + '...'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text style={styles.firstCard_author}>{firstArticle.author}</Text>
            <Text style={styles.firstCard_publishedAt}>
              {moment(firstArticle.publishedAt).format('ll')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderAllNews = ({ item }) => {
    return (
      <View style={styles.newsCard}>
        <Image
          source={{ uri: item.urlToImage }}
          style={styles.newsCard_image}
        />
        <View
          style={{
            justifyContent: 'space-between',
            padding: 10,
            flexShrink: 1,
          }}>
          <View>
            <Text style={styles.newsCard__title}>
              {item.title.substring(0, 60) + '...'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name="calendar" size={17} color={'#8d93ab'} />
              <Text style={styles.newsCard__bottomText}>
                {moment(item.publishedAt).format('ll')}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="clock-time-five-outline"
                size={17}
                color={'#8d93ab'}
              />
              <Text style={styles.newsCard__bottomText}>10 min read</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const HeaderComponent = () => {
    return (
      <>
        {renderTitle()}
        {renderFirstNews()}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}

      {!news ? (
        <ActivityIndicator size={'large'} color={'rgb(26,80,139)'} />
      ) : (
        <FlatList
          style={{ borderRadius: 40 }}
          showsVerticalScrollIndicator={false}
          data={news}
          keyExtractor={(item) => item.url}
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={() => <View style={{ marginBottom: 20 }} />}
          renderItem={renderAllNews}
        />
      )}
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
    marginBottom: 15,
  },
  todayDate: {
    fontFamily: 'Steradian Medium',
    color: 'rgba(0,0,0,0.3)',
    fontSize: 14,
    letterSpacing: 0.7,
    marginLeft: 20,
  },
  titleContainer: {
    marginVertical: 20,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Steradian Black',
    color: 'rgb(26,80,139)',
  },
  firstCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 320,
    marginBottom: 40,
  },
  firstCard_image: {
    height: 200,
    resizeMode: 'cover',
    borderRadius: 25,
  },
  firstCard_title: {
    fontSize: 20,
    fontFamily: 'Steradian Medium',
    color: '#0f4c75',
  },
  firstCard_author: {
    fontFamily: 'Steradian Medium',
    color: '#3282b8',
  },
  firstCard_publishedAt: {
    color: '#3282b8',
    fontFamily: 'Steradian Medium',
  },
  newsCard: {
    marginVertical: 10,
    flexDirection: 'row',
    borderRadius: 16,
  },
  newsCard_image: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  newsCard__title: {
    fontFamily: 'Steradian Medium',
    fontSize: 15,
  },

  newsCard__bottomText: {
    fontFamily: 'Steradian Regular',
    marginLeft: 5,
    fontSize: 12,
    color: '#8d93ab',
  },
});
