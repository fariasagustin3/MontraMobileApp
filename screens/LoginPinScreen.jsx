import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import NumericPad from 'react-native-numeric-pad';
import DeleteIcon from '../assets/arrow-left.png';
import PinOutlined from '../assets/ellipse-outline.png';
import PinFilled from '../assets/ellipse-fill.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDbConnection } from '../database/database';
import { loginUserPin } from '../database/auth';
import { getAccounts } from '../database/account';

const LoginPinScreen = ({navigation}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const numpadRef = useRef(null);

  const loginPin = async () => {
    try {
      // get db object from database connection
      const db = await getDbConnection();

      // get user from async storage and deserialize it
      const userSerialized = await AsyncStorage.getItem("user");
      const user = JSON.parse(userSerialized);
      const userId = user.user_id;

      // send db connection, pin and user_id and get response
      const loggedUser = await loginUserPin(db, pin, userId);

      // get accounts and verify if user has accounts. If not, redirect to
      // create accounts screen, else user will be redirect to home screen
      const accounts = await getAccounts(db);

      // verify if user pin is correct and there are user accounts, redirect to home screen
      // else user will be redirect to create account screen
      if(loggedUser.status) {
        setError(loggedUser.message);
      } else if(!accounts.length) {
        navigation.navigate("OnboardingAccountScreen");
      } else {
        navigation.navigate("HomeScreen");
      }
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(pin.length)
    if(pin.length === 4) {
      loginPin()
      numpadRef.current.clearAll();
    }
  }, [pin, setPin]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pinContainer}>
        <Text style={styles.title}>
          Enter your PIN
        </Text>
        <View style={styles.typePinContainer}>
          {pin.length > 0 ? (
            <Image source={PinFilled} style={styles.pin} />
          ) : (
            <Image source={PinOutlined} style={styles.pin} />
          )}
          {pin.length > 1 ? (
            <Image source={PinFilled} style={styles.pin} />
          ) : (
            <Image source={PinOutlined} style={styles.pin} />
          )}
          {pin.length > 2 ? (
            <Image source={PinFilled} style={styles.pin} />
          ) : (
            <Image source={PinOutlined} style={styles.pin} />
          )}
          {pin.length > 3 ? (
            <Image source={PinFilled} style={styles.pin} />
          ) : (
            <Image source={PinOutlined} style={styles.pin} />
          )}
        </View>
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
      </View>
      <View>
        <NumericPad
          numLength={4}
          value={pin}
          allowDecimal={false}
          ref={numpadRef}
          onValueChange={value => setPin(value)}
          buttonTextStyle={{
            fontFamily: 'Inter-Medium',
            color: '#FFFFFF',
            fontSize: 38,
          }}
          rightBottomButton={
            <Image source={DeleteIcon} style={styles.deleteIcon} />
          }
          onRightBottomButtonPress={() => {
            numpadRef.current.clear();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginPinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F3DFF',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteIcon: {
    width: 40,
    height: 20,
  },
  pinContainer: {
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    marginTop: 50,
    textAlign: 'center',
  },
  typePinContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 40,
    justifyContent: 'center',
  },
  pin: {
    width: 32,
    height: 32,
  },
});
