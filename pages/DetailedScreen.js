// DetailsScreen.js

import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { name, image, summary, genres, rating } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.genres}>Genres: {genres}</Text>
        <Text style={styles.rating}>Rating: {rating ? rating : 'N/A'}</Text>
        <Text style={styles.summary}>{summary ? summary.replace(/<\/?[^>]+(>|$)/g, "") : 'No summary available.'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  image: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  content: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  genres: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 5,
  },
  rating: {
    color: '#f39c12',
    fontSize: 16,
    marginBottom: 20,
  },
  summary: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default DetailsScreen;
