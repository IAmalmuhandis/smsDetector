import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OTPScreen = ({ route }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const navigation = useNavigation();
  const otp = route.params.otp;

  useEffect(() => {
    if (otp !== '') {
      setVerificationCode(otp.split(''));
    }
  }, [otp]);

  const navigateToVerificationScreen = () => {
    // Navigate to Code Verification screen and pass the OTP as a parameter
    navigation.navigate('CodeVerification', { otp });
  };

  const handleVerifyButton = () => {
    // Verify the entered code
    // You can implement your code verification logic here
  };

  const handleChangeCode = (index, text) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = text;
    setVerificationCode(newVerificationCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Code Verification Screen</Text>
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.otpInput}
          onChangeText={text => handleChangeCode(0, text)}
          value={verificationCode[0]}
          maxLength={1}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.otpInput}
          onChangeText={text => handleChangeCode(1, text)}
          value={verificationCode[1]}
          maxLength={1}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.otpInput}
          onChangeText={text => handleChangeCode(2, text)}
          value={verificationCode[2]}
          maxLength={1}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.otpInput}
          onChangeText={text => handleChangeCode(3, text)}
          value={verificationCode[3]}
          maxLength={1}
          keyboardType="numeric"
        />
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
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 24,
  },
});

export default OTPScreen;
