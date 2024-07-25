// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Import Bottom Tabs
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons
import SplashScreen from "./pages/SplashScreen"; // Import Splash Screen
import HomeScreen from "./pages/HomeScreen";
import DetailsScreen from "./pages/DetailedScreen";
import SearchScreen from "./pages/SearchScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Create a Bottom Tabs navigator

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1e1e1e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Movies" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Movie Details" }}
      />
    </Stack.Navigator>
  );
};

// Create a separate stack navigator for the Search tab
const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1e1e1e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search Movies" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Movie Details" }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#f39c12",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#1e1e1e", // Set your tab bar background color here
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack} // Use HomeStack for Home Tab
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack} // Use SearchStack for Search Tab
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default App;
