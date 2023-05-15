import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { SMS } from 'expo-sms';

const OTPScreen = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);

  const handleVerificationCodeChange = (index, value) => {
    const updatedVerificationCode = [...verificationCode];
    updatedVerificationCode[index] = value;
    setVerificationCode(updatedVerificationCode);
  };

  const requestSMSPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.SMS);
      if (status === 'granted') {
        console.log('SMS permission granted');
      } else {
        console.log('SMS permission denied');
      }
    } catch (error) {
      console.log('Error requesting SMS permission:', error);
    }
  };

  useEffect(() => {
    requestSMSPermission();
  }, []);

  const handleSmsReceived = (sms) => {
    const otpRegex = /(\d{4})/; // Modify the regex pattern according to your OTP format
    const otpMatch = sms.body.match(otpRegex);
    if (otpMatch && otpMatch[0]) {
      const otpCode = otpMatch[0];
      setVerificationCode(otpCode.split(''));
    }
  };

  useEffect(() => {
    const subscription = SMS.addListener(handleSmsReceived);
    return () => subscription.remove();
  }, []);

  const handleVerifyButton = () => {
    const code = verificationCode.join('');
    // Verify the entered code
    // You can implement your code verification logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Code Verification Screen</Text>
      <View style={styles.otpContainer}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            onChangeText={(text) => handleVerificationCodeChange(index, text)}
            value={verificationCode[index]}
            maxLength={1}
            keyboardType="numeric"
          />
        ))}
      </View>
      <Button title="Verify" onPress={handleVerifyButton} />
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  otpInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 8,
  },
});

export default OTPScreen;
