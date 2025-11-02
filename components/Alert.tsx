import { Cinzel_700Bold, useFonts } from "@expo-google-fonts/cinzel";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, Vibration, View } from "react-native";
import { AlertType } from "../types/general";
import { useEffect } from "react";


interface AlertProps {
  visible: boolean;
  title: string,
  message: string,
  type: AlertType
  onClose: () => void,
}

const iconMap = {
  info: 'circle-info',
  warn: 'triangle-exclamation',
  error: 'circle-xmark',
  success: 'circle-check'
} as const;

const gradientMap = {
  info: ['#1c2541', '#2b2b2b'],
  warn: ['#f1d13fff', '#2b2b2b'],
  error: ['#8B0000', '#2b2b2b'],
  success: ['#0e6d16ff', '#2b2b2b']
} as const;

const Alert = (props: AlertProps) => {
  const [fontsLoaded] = useFonts({ Cinzel_700Bold });

  useEffect(() => {
    Vibration.vibrate(200);
  }, []);


  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 justify-center items-center bg-black/40 px-4">
      <LinearGradient colors={gradientMap[props.type]} className="w-3/4 rounded-xl p-6 border-2 border-leagueGold overflow-hidden">
        <Text className="text-leagueGold text-xl mb-2 text-center" style={{ fontFamily: 'Cinzel_700Bold' }}>
          {props.title}
        </Text>
        <View className="flex-row justify-center mb-2">
          <FontAwesome6 name={iconMap[props.type]} iconStyle="solid" size={40} color="#c8aa6e" />
        </View>
        <Text className="text-white text-base mb-6 text-center">
          {props.message}
        </Text>
        <View className="flex-row justify-center">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={props.onClose}
            className="w-32"
          >
            <LinearGradient
              colors={["#1b1b1b", "#2b2b2b"]}
              className="py-3 border border-leagueGold items-center overflow-hidden"
            >
              <Text
                className="text-leagueGold font-bold"
                style={{ fontFamily: 'Cinzel_700Bold' }}
              >
                Close
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  )
}

export default Alert;