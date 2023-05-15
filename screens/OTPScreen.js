import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { PermissionsAndroid } from "react-native";
import {
	startReadSMS,
	stopReadSMS,
} from "@maniac-tech/react-native-expo-read-sms";

const OTPScreen = () => {
	const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
	const [hasReceiveSMSPermission, setHasReceiveSMSPermission] = useState(false);
	const [hasReadSMSPermission, setHasReadSMSPermission] = useState(false);

	const handleVerificationCodeChange = (index, value) => {
		const updatedVerificationCode = [...verificationCode];
		updatedVerificationCode[index] = value;
		setVerificationCode(updatedVerificationCode);
	};

	const handleVerifyButton = () => {
		const code = verificationCode.join("");
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
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#E0E0E0",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
	},
	otpContainer: {
		flexDirection: "row",
		marginBottom: 20,
	},
	otpInput: {
		flex: 1,
		height: 50,
		borderWidth: 1,
		borderColor: "gray",
		marginHorizontal: 5,
		textAlign: "center",
		fontSize: 24,
		borderRadius: 8,
	},
});

export default OTPScreen;
