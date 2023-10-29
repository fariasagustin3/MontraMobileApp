import React from 'react';
import { View, StyleSheet, Pressable, Image, Text } from 'react-native';
import BackButton from '../assets/arrow-left-black.png';
import BackButtonWhite from '../assets/arrow-left.png';

const Header = ({ color, navigation, title, colorTitle, backButton }) => {
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image source={backButton === 'white' ? BackButtonWhite : BackButton} style={styles.backButton} />
      </Pressable>
      <Text style={[styles.headerTitle, { color: colorTitle }]}>{ title }</Text>
      <Text style={{ color: color }}>76876876</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 50,
    height: 30,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    fontSize: 18,
  },
})

export default Header;
