import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import NumericPad from 'react-native-numeric-pad';
import DeleteIcon from '../assets/arrow-left.png';
import PinOutlined from '../assets/ellipse-outline.png';
import PinFilled from '../assets/ellipse-fill.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerPin } from '../database/auth';
import { getDbConnection } from '../database/database';
import { getUserById } from '../database/user';

const RegisterPinScreen = ({navigation}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const numpadRef = useRef(null);

  const generatePin = async () => {
    try {
      // get db object from database connection
      const db = await getDbConnection();

      // get user id to update
      const userSerialized = await AsyncStorage.getItem("user");
      const user = JSON.parse(userSerialized);
      const userId = user.user_id;

      // updated pin value using db connection, pin and user_id
      const newPin = await registerPin(db, pin, userId);
      console.log("new pin: ", newPin)

      // get user with new pin
      const newUser = await getUserById(db, userId);
      console.log("new user: ", newUser);

      // save new user values into async storage
      const newUserSerialized = JSON.stringify(newUser);
      await AsyncStorage.setItem("user", newUserSerialized);

      navigation.navigate("LoginPinScreen");
    } catch(err) {
      setError(err)
      numpadRef.current.clearAll();
    }
  }

  useEffect(() => {
    console.log(pin.length)
    if(pin.length === 4) {
      generatePin()
      numpadRef.current.clearAll();
    }
  }, [pin]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pinContainer}>
        <Text style={styles.title}>
          Let's setup your PIN
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
          numLength={8}
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

export default RegisterPinScreen;

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
