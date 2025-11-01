import './global.css';
import { AlertProvider } from './context/AlertContext';
import AppContent from './AppContent';

export default function App() {


  return (
    <AlertProvider>
      <AppContent />
    </AlertProvider>
  );
}
