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

	useEffect(() => {
		const checkPermissions = async () => {
			const customHasReceiveSMSPermission = await PermissionsAndroid.check(
				PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
			);
			const customHasReadSMSPermission = await PermissionsAndroid.check(
				PermissionsAndroid.PERMISSIONS.READ_SMS
			);

			setHasReceiveSMSPermission(customHasReceiveSMSPermission);
			setHasReadSMSPermission(customHasReadSMSPermission);
		};

		const requestSMSPermission = async () => {
			await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.READ_SMS,
				PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
			]);

			try {
				const granted = await PermissionsAndroid.requestMultiple([
					PermissionsAndroid.PERMISSIONS.READ_SMS,
					PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
				]);

				if (
					granted["android.permission.READ_SMS"] ===
						PermissionsAndroid.RESULTS.GRANTED &&
					granted["android.permission.RECEIVE_SMS"] ===
						PermissionsAndroid.RESULTS.GRANTED
				) {
					console.log("SMS permission granted");
					checkPermissions();
				} else {
					console.log("SMS permission denied");
				}
			} catch (error) {
				console.log("Error requesting SMS permission:", error);
			}
		};

		checkPermissions();
		requestSMSPermission();
	}, []);

	useEffect(
		() => {
			// const handleSmsReceived = (status, sms, error) => {
			//   if (status === 'Start Read SMS successfully' || status === 'success') {
			//     console.log('SMS received');
			//     console.log('SMS:', sms);
			//     // Add your SMS handling logic here
			//   } else {
			//     console.log('Error in success callback');
			//     console.log('Error:', error);
			//   }
			// };
			// if (hasReceiveSMSPermission && hasReadSMSPermission) {
			//   const subscription = startReadSMS(handleSmsReceived);
			//   return () => {
			//     stopReadSMS();
			//     subscription.remove();
			//   };
			// }
		},
		[
			// hasReceiveSMSPermission,
			// hasReadSMSPermission
		]
	);

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
