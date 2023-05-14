import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SMS from 'expo-sms';

const GetStartedScreen = () => {
  const navigation = useNavigation();
  const [otp, setOTP] = useState('');

  useEffect(() => {
    if (otp !== '') {
      navigateToVerificationScreen();
    }
  }, [otp]);

  const handleButtonClick = async () => {
    // Generate and send SMS with OTP
    const phoneNumber = '08123402377'; // Replace with the desired phone number
    const generatedOTP = generateOTP(); // Generate OTP

    const message = `Your OTP is: ${generatedOTP}`;

    // try {
  
    //   if (result === SMS.SentStatus.Sent) {
    //     console.log('SMS sent successfully');
    //     setOTP(generatedOTP);
    //   } else {
    //     console.log('Failed to send SMS');
    //   }
    // } catch (error) {
    //     navigation.navigate('CodeVerification', { otp });
       
    //   console.log('Error sending SMS:', error);
    // }
    const { result } = await SMS.sendSMSAsync([phoneNumber], message);
    console.log('SMS sent successfully');
        setOTP(generatedOTP);
        navigation.navigate('CodeVerification', { otp });

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
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 100,
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
