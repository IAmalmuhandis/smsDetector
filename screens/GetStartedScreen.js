import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { encode } from 'base-64';

const GetStartedScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');

  const generateOTP = () => {
    // Generate a random 4-digit OTP
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleButtonClick = async () => {
    if (phoneNumber === '') {
      console.log('Please enter a phone number');
      return;
    }

    const generatedOTP = generateOTP(); // Generate OTP

    try {
      const accountSid = 'AC05de73e04d00099ddf28737cab1b507e';
      const authToken = '3a76e8ae4ea5146a86a6717bf8a4d6b0';
      const credentials = `${accountSid}:${authToken}`;
      const encodedCredentials = encode(credentials);

      const response = await axios.post(
        'https://api.twilio.com/2010-04-01/Accounts/AC05de73e04d00099ddf28737cab1b507e/Messages.json',
        {
          Body: `Your OTP is: ${generatedOTP}`,
          From: '+12057724716',
          To: phoneNumber,
        },
        {
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log(response.data);

      // Navigate to the next screen
      navigation.navigate('CodeVerification');
    } catch (error) {
      console.log('There is an error:', error.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/snowy.jpg')} style={styles.image} />
      <Text style={styles.label}>Enter Phone Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },
  image: {
    marginTop: -150,
    width: 500,
    height: 500,
    borderBottomRightRadius: 300,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '70%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GetStartedScreen;
