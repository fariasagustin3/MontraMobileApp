import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Eye from '../assets/eye.png';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { register } from '../database/auth';
import { getDbConnection } from '../database/database';
import { getUserById } from '../database/user';
import Header from '../components/Header';

const widthScreen = Dimensions.get('window').width;

const RegisterScreen = ({ navigation }) => {
  const [visibleEntry, setVisibleEntry] = useState(true);
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // get db object from db connection:
      const db = await getDbConnection();

      // get user_id when is created to use on another query:
      const userId = await register(db, name, email, password);

      // get user using user_id and save it into async storage
      const user = await getUserById(db, userId);

      // serialize user data
      const userSerialized = JSON.stringify(user);

      // save user created into async storage for session
      await AsyncStorage.setItem("user", userSerialized);

      if(user) {
        setLoading(false);
        navigation.navigate("RegisterPinScreen")
      } else {
        setError(userId);
        setLoading(false);
      }
    } catch(err) {
      setLoading(false);
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <Header
        color='#FCFCFC'
        navigation={navigation}
        title='Sign Up'
        colorTitle='#000'
        backButton='black'
      />

      {/* form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          placeholderTextColor="#91919F"
          value={name}
          onChangeText={value => setName(value)}
        />
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingRight: 30,
          }}>
          <CheckBox
            value={checked}
            onValueChange={setChecked}
            tintColors={{ true: '#7F3DFF' }}
          />
          <Text style={{ color: '#000', fontFamily: 'Inter-Medium' }}>
            By signing up, you agree to the{' '}
            <Text style={{ color: '#7F3DFF', fontFamily: 'Inter-Medium' }}>
              Terms of Service and Privacy Policy
            </Text>
          </Text>
        </View>
        <Pressable style={{ backgroundColor: '#FFF' }} onPress={handleSubmit}>
          <Text style={styles.signupBtn}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              'Sign Up'
            )}
          </Text>
          {error && (
            <Text
              style={{
                color: '#FD3C4A',
                fontFamily: 'Inter-Medium',
                textAlign: 'center',
                marginTop: 10,
              }}>
              {error}
            </Text>
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
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('LoginScreen')}
              style={{ color: '#7F3DFF', fontFamily: 'Inter-SemiBold' }}>
              Login
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    backgroundColor: '#FCFCFC',
    flex: 1,
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
    color: '#000',
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
