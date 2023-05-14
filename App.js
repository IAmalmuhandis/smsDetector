import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image, Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Swiper, SwiperItem } from 'react-native-swiper';
import GetStartedScreen from './screens/GetStartedScreen';
import OTPScreen from './screens/OTPScreen';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen  name="Get Started" component={GetStartedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CodeVerification" component={OTPScreen} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;