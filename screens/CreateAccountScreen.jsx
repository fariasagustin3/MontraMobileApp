import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import Header from '../components/Header';
import ModalDropdown from 'react-native-modal-dropdown';
import ArrowDown from '../assets/arrow-down-2.png';
import { getDbConnection } from '../database/database';
import { createNewAccount, getAccountById } from '../database/account';

const widthScreen = Dimensions.get("window").width;
const options = ['Bank', 'Digital Wallet', 'Cash'];

const CreateAccountScreen = ({ navigation }) => {
  const [balance, setBalance] = useState(null);
  const [name, setName] = useState('');
  const [selectedOption, setSelectedOption] = useState("");

  const createAccount = async () => {
    try {
      // get db connection
      const db = await getDbConnection();

      // create account function
      const accountId = await createNewAccount(db, name, balance, selectedOption);
      
      if(accountId !== 0) {
        navigation.navigate("AccountCreatedScreen")
      } else {
        console.log(accountId);
      }
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        color='#7F3DFF'
        navigation={navigation}
        title='Add new account'
        colorTitle='#FFF'
        backButton='white'
      />
      <View style={styles.bottomContainer}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Balance</Text>
          <View style={styles.balanceAmountContainer}>
            <Text style={styles.dollar}>$</Text>
            <TextInput
              placeholder='0.00'
              placeholderTextColor='#FCFCFC'
              style={styles.balance}
              value={balance}
              keyboardType='numeric'
              onChangeText={setBalance}
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholder='Name'
            value={name}
            onChangeText={setName}
            style={styles.nameInput}
          />
          <View>
            <ModalDropdown
              options={options}
              onSelect={(index, value) => setSelectedOption(value)}
              defaultIndex={0}
              style={styles.modalDropdown}
              dropdownStyle={styles.dropdownStyles}
              dropdownTextStyle={styles.optionStyles}
              textStyle={styles.textStyles}
              isFullWidth={true}
            >
              <View style={styles.dropdownInside}>
                <Text
                  style={{
                    color: '#91919F',
                    fontSize: 16, fontFamily: 'Inter-Regular'
                  }}>{selectedOption ? selectedOption : "Account Type"}</Text>
                <Image
                  source={ArrowDown}
                  style={styles.arrowDown}
                />
              </View>
            </ModalDropdown>
          </View>
          <Pressable
            style={styles.buttonContainer}
            onPress={createAccount}
          >
            <Text style={styles.button}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    height: '100%',
    backgroundColor: '#7F3DFF',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  // balance
  balanceContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  balanceTitle: {
    color: '#FCFCFC',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  balanceAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollar: {
    color: '#FCFCFC',
    fontSize: 64,
    fontFamily: 'Inter-SemiBold'
  },
  balance: {
    color: '#FCFCFC',
    fontSize: 64,
    fontFamily: 'Inter-SemiBold',
    width: '100%',
  },

  // form
  formContainer: {
    backgroundColor: '#FCFCFC',
    marginHorizontal: -25,
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    gap: 20,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#91919F',
    borderRadius: 10,
    paddingHorizontal: 20,
    color: '#91919F',
    fontSize: 16,
    fontFamily: 'Inter-Regular'
  },

  // dropdown
  modalDropdown: {
    borderWidth: 1,
    borderColor: '#91919F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  dropdownStyles: {
    width: '70%',
    borderWidth: 2,
    borderColor: '#91919F'
  },
  textStyles: {
    color: '#91919F',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  dropdownInside: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionStyles: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  arrowDown: {
    width: 30,
    height: 30,
  },

  // button
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
});

export default CreateAccountScreen;
