import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';
import LoginScreen from './screens/LoginScreen';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useAlert } from './context/AlertContext';
import { Alert } from './utils/Alert';
import { useEffect } from 'react';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppContent() {
  const { show } = useAlert();

  useEffect(() => {
    Alert.init(show);
  }, [show]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
