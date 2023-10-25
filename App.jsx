import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="SplashScreen"
          component={SplashScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="OnboardingScreen"
          component={OnboardingScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="LoginScreen"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
