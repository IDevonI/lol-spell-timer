import { Cinzel_700Bold, useFonts } from "@expo-google-fonts/cinzel";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { LinearGradient } from "expo-linear-gradient";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native"

interface ConfirmDialogProps {
  visible: boolean,
  title: string,
  message: string,
  confirmLabel?: string,
  cancelLabel?: string,
  onConfirm: () => void,
  onCancel: () => void
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const [fontsLoaded] = useFonts({ Cinzel_700Bold });

  if (!fontsLoaded) return null;
  return (
    <Modal transparent visible={props.visible} animationType="fade">
      <Pressable className="flex-1 bg-black/70 justify-center items-center" onPress={props.onCancel}>
        <Pressable className="w-11/12 max-w-md" onPress={() => { }}>
          <LinearGradient colors={['#1b1b1b', '#2b2b2b']} className="rounded-xl p-6 border-2 border-leagueGold overflow-hidden">
            <Text className="text-leagueGold text-xl mb-2 text-center" style={{ fontFamily: 'Cinzel_700Bold' }}>
              {props.title}
            </Text>
            <FontAwesome6 name="trash-can" size={48} color="#c8aa6e" style={{ alignSelf: 'center', marginBottom: 16 }} />
            <Text className="text-white text-base mb-6 text-center">
              {props.message}
            </Text>
            <View className="flex-row justify-center gap-4">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={props.onConfirm}
                className="flex-1"
              >
                <LinearGradient
                  colors={[ '#0e6d16ff', '#309127ff']}
                  className="py-3 rounded-lg border items-center overflow-hidden"
                >
                  <Text
                    className="text-white font-bold"
                    style={{ fontFamily: 'Cinzel_700Bold' }}
                  >
                    {props.confirmLabel || "Confirm"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={props.onCancel}
                className="flex-1"
              >
                <LinearGradient
                  colors={['#8B0000', '#B22222']}
                  className="py-3 rounded-lg border items-center flex-row justify-center gap-2 overflow-hidden"
                >
                  <Text
                    className="text-white font-bold"
                    style={{ fontFamily: 'Cinzel_700Bold' }}
                  >
                    {props.cancelLabel || "Cancel"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default ConfirmDialog;