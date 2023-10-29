import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RegisterPinScreen from './screens/RegisterPinScreen';
import LoginPinScreen from './screens/LoginPinScreen';
import OnboardingAccountScreen from './screens/OnboardingAccountScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="SplashScreen"
          component={SplashScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardingScreen"
          component={OnboardingScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="RegisterScreen"
          component={RegisterScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="RegisterPinScreen"
          component={RegisterPinScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginPinScreen"
          component={LoginPinScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardingAccountScreen"
          component={OnboardingAccountScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
