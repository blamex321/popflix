// pages/SplashScreen.js

import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();

  const logoOpacity = new Animated.Value(0);
  const textPosition = new Animated.Value(-50);

  useEffect(() => {
    // Fade in the logo
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Slide in the text
    Animated.timing(textPosition, {
      toValue: 0,
      duration: 1000,
      easing: Easing.bounce,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Navigate to the Home screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Main'); // Replace with your main screen
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
        <Image
          source={require('../assets/logo.png')} // Replace with your logo path
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View style={{ transform: [{ translateY: textPosition }] }}>
        <Text style={styles.appName}>My Awesome App</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010', // Your brand color
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: width * 0.5,
    height: height * 0.25,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SplashScreen;
