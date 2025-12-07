import { createContext, useState, ReactNode, useContext } from "react";
import { AlertType } from "../types/general";
import Alert from "../components/Alert";
import { View } from "react-native";

interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
}

interface AlertContextValue {
  show: (type: AlertType, title: string, message: string, duration?: number) => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const show = (type: AlertType, title: string, message: string, duration = 0) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newAlert: Alert = { id, type, title, message };

    setAlerts(prev => [...prev, newAlert]);

    if (duration)
      setTimeout(() => {
        setAlerts(prev => prev.filter(a => a.id !== id));
      }, duration);
  };

  const remove = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AlertContext.Provider value={{ show }}>
      {children}
      {alerts.length > 0 && (
        <View className="absolute inset-0 pointer-events-none bg-black/40">
          <View className="flex-1 justify-center items-center">
            {alerts.map((alert, index) => (
              <View
                key={alert.id}
                className="w-full items-center"
                style={{
                  marginTop: index === 0 ? 0 : index * 12,
                  zIndex: 1000 - index,
                }}>
                <Alert
                  visible={true}
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  onClose={() => remove(alert.id)}
                />
              </View>
            ))}
          </View>
        </View>
      )}
    </AlertContext.Provider>
  )
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
}