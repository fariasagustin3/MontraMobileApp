import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import MontraSplash from '../assets/montra-icon-splash.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const getUser = async () => {
    try {
      const userStored = await AsyncStorage.getItem("user");
      const userFormatted = JSON.parse(userStored);

      if (userFormatted) {
        console.log(userFormatted);
      } else {
        setTimeout(() => {
          navigation.navigate("OnboardingScreen");
        }, 2000)
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={MontraSplash} style={styles.splash} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7F3DFF',
  },
  splash: {
    width: 170,
    height: 40,
  },
});
