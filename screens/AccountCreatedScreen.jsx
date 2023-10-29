import React, { useEffect } from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Success from '../assets/success.png';

const AccountCreatedScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("HomeScreen");
    }, 3000)
  })

  return (
    <View style={styles.container}>
      <Image
        source={Success}
        style={styles.success}
      />
      <Text style={styles.text}>You are set!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  success: {
    width: 130,
    height: 130,
  },
  text: {
    color: '#212325',
    fontSize: 24,
    fontFamily: 'Inter-Medium'
  }
})

export default AccountCreatedScreen;
