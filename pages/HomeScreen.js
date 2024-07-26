// HomeScreen.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await axios.get(
          'https://api.tvmaze.com/search/shows?q=all'
        );
        const showData = response.data.map((item) => ({
          id: item.show.id,
          name: item.show.name,
          image: item.show.image
            ? item.show.image.medium
            : 'https://via.placeholder.com/210x295', // Placeholder for missing images
          url: item.show.url,
          summary: item.show.summary,
          genres: item.show.genres.join(', '),
          rating: item.show.rating.average,
        }));
        setMovies(showData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    getMovies();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Details', {
          movieId: item.id,
          name: item.name,
          image: item.image,
          summary: item.summary,
          genres: item.genres,
          rating: item.rating,
        })
      }
    >
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.genres}>{item.genres}</Text>
          <Text style={styles.rating}>
            Rating: {item.rating ? item.rating : 'N/A'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="orange" style={styles.loader} />
        ) : (
          <FlatList
            data={movies}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.contentContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101010', // Set your background color here
  },
  container: {
    flex: 1,
    backgroundColor: '#101010',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  loader: {
    marginTop: 50,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 20, // Add some space between rows
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    overflow: 'hidden',
    width: width / 2 - 25, // Adjust width to account for margin
    marginRight: 10, // Add margin to the right side of the card
  },
  image: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  genres: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 5,
  },
  rating: {
    color: '#f39c12',
    fontSize: 12,
  },
  contentContainer: {
    paddingBottom: 20, // Add padding at the bottom for better UX
  },
});

export default HomeScreen;
