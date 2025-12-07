import './global.css';
import { AlertProvider } from './context/AlertContext';
import AppContent from './AppContent';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {


  return (
    <SafeAreaProvider>
      <AlertProvider>
        <StatusBar barStyle="light-content"/>
        <AppContent />
      </AlertProvider >
    </SafeAreaProvider>
  );
}
