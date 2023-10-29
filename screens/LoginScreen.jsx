import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BackButton from '../assets/arrow-left-black.png';
import Eye from '../assets/eye.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const widthScreen = Dimensions.get('window').width;

const LoginScreen = ({ navigation }) => {
  const [visibleEntry, setVisibleEntry] = useState(true);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={BackButton} style={styles.backButton} />
        </Pressable>
        <Text style={styles.headerTitle}>Login</Text>
        <Text style={{ color: '#FCFCFC' }}>76876876</Text>
      </View>

      {/* form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="#91919F"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <View style={styles.inputPasswordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            placeholderTextColor="#91919F"
            secureTextEntry={visibleEntry}
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <Pressable onPress={() => setVisibleEntry(!visibleEntry)}>
            <Image source={Eye} style={styles.eye} />
          </Pressable>
        </View>
        <Pressable style={{ backgroundColor: '#FFF' }} onPress={handleSubmit}>
          <Text style={styles.signupBtn}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              'Login'
            )}
          </Text>
          {error && (
            <Text style={{ color: '#FD3C4A', fontFamily: 'Inter-Medium', textAlign: 'center', marginTop: 10 }}>{error}</Text>
          )}
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#91919F',
              fontFamily: 'Inter-Medium',
              textAlign: 'center',
              alignItems: 'center',
            }}>
            Don't have an account yet?{' '}
            <Text
              onPress={() => navigation.navigate('RegisterScreen')}
              style={{ color: '#7F3DFF', fontFamily: 'Inter-SemiBold' }}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    backgroundColor: '#FCFCFC',
    flex: 1,
  },

  // header
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

  // form
  formContainer: {
    marginTop: 120,
    gap: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#F1F1FA',
    paddingHorizontal: 20,
    borderRadius: 10,
    fontFamily: 'Inter-Medium',
    color: '#000',
  },
  inputPasswordContainer: {
    borderWidth: 1,
    borderColor: '#F1F1FA',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  inputPassword: {
    fontFamily: 'Inter-Medium',
    width: '100%',
    color: '#000'
  },
  eye: {
    width: 27,
    height: 20,
  },
  checked: {
    width: 60,
    height: 60,
  },
  signupBtn: {
    backgroundColor: '#7F3DFF',
    width: widthScreen - 35,
    textAlign: 'center',
    color: '#FCFCFC',
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 10,
  },
});
