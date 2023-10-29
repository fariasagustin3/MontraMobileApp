import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import MontraSplash from '../assets/montra-icon-splash.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteDb, getDbConnection, initDatabase } from '../database/database';

const SplashScreen = ({ navigation }) => {
  const getUser = async () => {
    try {
      // init databases and create tables or delete tables
      // await deleteDb();
      // await AsyncStorage.removeItem("user");
      
      const db = await getDbConnection()
      await initDatabase(db);


      // get user from async storage and deserialize it
      const userStored = await AsyncStorage.getItem("user");
      const userFormatted = JSON.parse(userStored);

      if (userFormatted && !userFormatted.pin) {
        setTimeout(() => {
          navigation.navigate("RegisterPinScreen");
        }, 2000);
      } else if(userFormatted && userFormatted.pin) {
        setTimeout(() => {
          navigation.navigate("LoginPinScreen");
        }, 2000);
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
