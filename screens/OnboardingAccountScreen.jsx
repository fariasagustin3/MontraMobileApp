import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';

const OnboardingAccountScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Let's setup your account!</Text>
        <Text style={styles.subtitle}>Account can be your bank, digital wallet or just your cash.</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("CreateAccountScreen")}
        >
          <Text style={styles.button}>Let's go</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingHorizontal: 35,
  },
  topContainer: {
    gap: 20,
    marginTop: 50
  },
  title: {
    color: '#000',
    fontSize: 36,
    fontFamily: 'Inter-Medium',
  },
  subtitle: {
    color: '#292B2D',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    lineHeight: 20,
  },
  bottomContainer: {},
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: '#7F3DFF',
    borderRadius: 15
  },
  button: {
    color: '#FCFCFC',
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    paddingVertical: 15,
  }
})

export default OnboardingAccountScreen;
