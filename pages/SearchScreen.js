// SearchScreen.js

import React, { useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import axios from "axios";

const { width } = Dimensions.get("window");

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook to check if screen is focused

  const searchMovies = async () => {
    setLoading(true);
    Keyboard.dismiss(); // Hide the keyboard when search is pressed

    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${searchTerm}`
      );

      const showData = response.data.map((item) => ({
        id: item.show.id,
        name: item.show.name,
        image: item.show.image
          ? item.show.image.medium
          : "https://via.placeholder.com/210x295", // Placeholder for missing images
        url: item.show.url,
        summary: item.show.summary,
        genres: item.show.genres.join(", "),
        rating: item.show.rating.average,
      }));

      setMovies(showData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isFocused && searchTerm) {
      searchMovies(); // Re-run search if returning to the screen with a search term
    }
  }, [isFocused]); // Re-run effect when screen comes into focus

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", {
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
            Rating: {item.rating ? item.rating : "N/A"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for movies..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={searchMovies}
          returnKeyType="search"
          autoCapitalize="none"
        />
        {loading ? (
          <ActivityIndicator
            size="large"
            color="orange"
            style={styles.loader}
          />
        ) : (
          <FlatList
            data={movies}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={
              searchTerm && (
                <Text style={styles.noResults}>
                  No results found for "{searchTerm}"
                </Text>
              )
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#101010",
  },
  container: {
    flex: 1,
    backgroundColor: "#101010",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  searchBar: {
    height: 40,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  loader: {
    marginTop: 50,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    overflow: "hidden",
    width: width / 2 - 25,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 160,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  genres: {
    color: "#ccc",
    fontSize: 12,
    marginBottom: 5,
  },
  rating: {
    color: "#f39c12",
    fontSize: 12,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  noResults: {
    color: "#ccc",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SearchScreen;
