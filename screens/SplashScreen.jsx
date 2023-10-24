import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MontraSplash from '../assets/montra-icon-splash.png'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={MontraSplash} style={styles.splash} />
    </View>
  )
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7F3DFF'
  },
  splash: {
    width: 170,
    height: 40
  }
})