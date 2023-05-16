import { useEffect, useState } from "react";
import { PermissionsAndroid } from "react-native";

import {
  requestReadSMSPermission,
  startReadSMS,
} from "@maniac-tech/react-native-expo-read-sms";

const useApp = () => {
  const [appState, setAppState] = useState(null);
  const [hasReceiveSMSPermission, setHasReceiveSMSPermission] = useState(false);
  const [hasReadSMSPermission, setHasReadSMSPermission] = useState(false);
  const [smsPermissionState, setSmsPermissionState] = useState(null);
  const [successCallbackStatus, setSuccessCallbackStatus] = useState(null);
  const [errorCallbackStatus, setErrorCallbackStatus] = useState(null);
  const [smsValue, setSmsValue] = useState(null);
  const [smsError, setSMSError] = useState(null);

  const buttonClickHandler = () => {
    startReadSMS(callbackFn1, callbackFn2);
  };

  const callbackFn1 = (status, sms, error) => {
    setSmsPermissionState("Success Callback!");

    if (status === "Start Read SMS successfully") {
      setSuccessCallbackStatus("Start Read SMS successfully");
      setSmsValue(sms);
    } else if (status === "success") {
      setSuccessCallbackStatus("just success");
      setSmsValue(sms);
    } else {
      setSuccessCallbackStatus("Error in success callback");
      setSMSError(error);
    }
  };

  const callbackFn2 = (status, sms, error) => {
    setSmsPermissionState("Error Callback!");
    setErrorCallbackStatus("Start Read SMS failed");
  };

  const checkPermissions = async () => {
    const customHasReceiveSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
    );
    const customHasReadSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_SMS
    );

    setHasReceiveSMSPermission(customHasReceiveSMSPermission);
    setHasReadSMSPermission(customHasReadSMSPermission);
    setAppState("Permission check complete");
  };

  const requestSMSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      ]);

      if (
        granted["android.permission.RECEIVE_SMS"] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted["android.permission.READ_SMS"] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        setHasReceiveSMSPermission(true);
        setHasReadSMSPermission(true);
      } else {
        setHasReceiveSMSPermission(false);
        setHasReadSMSPermission(false);
      }
    } catch (error) {
      console.error("Error while requesting SMS permission:", error);
    }
  };

  useEffect(() => {
    setAppState("init");
    checkPermissions();
  }, []);

  useEffect(() => {
    if (hasReceiveSMSPermission && hasReadSMSPermission) {
      console.log("hasReadSMSPermission: ", hasReadSMSPermission);
      console.log("hasReceiveSMSPermission: ", hasReceiveSMSPermission);
    }
  }, [hasReceiveSMSPermission, hasReadSMSPermission]);

  useEffect(() => {
    if (hasReceiveSMSPermission && hasReadSMSPermission) {
      console.log("hasReadSMSPermission: ", hasReadSMSPermission);
      console.log("hasReceiveSMSPermission: ", hasReceiveSMSPermission);
    }
  }, [hasReceiveSMSPermission, hasReadSMSPermission]);

  return {
    appState,
    buttonClickHandler,
    checkPermissions,
    errorCallbackStatus,
    hasReceiveSMSPermission,
    hasReadSMSPermission,
    requestReadSMSPermission : requestSMSPermission, // Include the requestReadSMSPermission function
    smsPermissionState,
    successCallbackStatus,
    smsValue,
    smsError,
  };
};

export default useApp;
