import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity , TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SendSMS from 'react-native-sms';

const GetStartedScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');

  useEffect(() => {
    if (otp !== '') {
      navigateToVerificationScreen();
    }
  }, [otp]);

  const handleButtonClick = async () => {
    if (phoneNumber === '') {
      console.log('Please enter a phone number');
      return;
    }

    const generatedOTP = generateOTP(); // Generate OTP
    const message = `Your OTP is: ${generatedOTP}`;

    sendSMS(phoneNumber, message);
    setOTP(generatedOTP);
  };

  const sendSMS = async (phoneNumber, message) => {
    const apiKey = 'TL2AQ5PrkFArJJiCNrS6JzHhAJb54pVe6Xi0qOCKjisk0zDXU5nt5C5EEBjp5L'; // Replace with your actual API key
    const termiiEndpoint = 'https://api.ng.termii.com/api/sms/otp/send';

    try {
      const response = await axios.post(termiiEndpoint, {
        api_key: apiKey,
        to: phoneNumber,
        from: 'Abubakar', // Replace with your desired sender name
        sms: message,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('SMS sent successfully', response.data);
    } catch (error) {
      console.error('Error sending SMS', error);
    }
  };

  const generateOTP = () => {
    // Generate a random 4-digit OTP
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const navigateToVerificationScreen = () => {
    // Navigate to Code Verification screen and pass the OTP as a parameter
    navigation.navigate('CodeVerification', { otp });
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
