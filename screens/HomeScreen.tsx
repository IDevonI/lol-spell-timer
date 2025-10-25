import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Cinzel_700Bold } from "@expo-google-fonts/cinzel";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Account } from '../types/index';

const STORAGE_KEY = "@lol_accounts";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [savedAccounts, setSavedAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account>({} as Account);

  const [fontsLoaded] = useFonts({ Cinzel_700Bold });

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setSavedAccounts(JSON.parse(stored));
          setSelectedAccount(JSON.parse(stored)[0]);
        }
      } catch (e) {
        console.log("Error loading accounts:", e);
      }
    })();
  }, []);

  const handleNext = () => {
    if (selectedAccount.puuid) {
      navigation.navigate('Game', { account: selectedAccount });
    } else {
      Alert.alert("Error", "No account selected or available.");
    }
  };

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-leagueNavy">
        <Text className="text-white">Loading fonts...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      resizeMode="cover"
      className="flex-1"
    >
      <LinearGradient
        colors={["#0a1020", "rgba(0,0,0,0.8)", "transparent"]}
        className="flex-1 justify-center items-center px-8"
      >
        <View className="absolute top-16 w-full items-center">
          <Text
            className="text-leagueGold text-4xl text-center leading-tight"
            style={{ fontFamily: "Cinzel_700Bold", letterSpacing: 2 }}
          >
            LoL{"\n"}Spell Timer
          </Text>
        </View>

        <View className="flex-row items-center mb-4 w-full">
          <Text
            className="text-leagueGold text-xl text-center leading-tight text-center w-full mb-2"
            style={{ fontFamily: "Cinzel_700Bold", letterSpacing: 2 }}
          >
            Choose your account
          </Text>
        </View>

        <View className="bg-leaguePanel rounded-xl mb-8 w-full">
          <Picker
            selectedValue={selectedAccount.puuid || ""} // Use puuid as the value
            onValueChange={(value) => {
              const account = savedAccounts.find(a => a.puuid === value);
              setSelectedAccount(account || {} as Account);
            }}
            dropdownIconColor="white"
            style={{ color: "white" }}
          >
            {savedAccounts.map((a) => (
              <Picker.Item key={a.puuid} label={`${a.username}#${a.tag} (${a.region})`} value={a.puuid} />
            ))}
          </Picker>
          <Button title="Add Account" onPress={() => navigation.navigate('Login')} />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleNext}
          className="overflow-hidden shadow-lg shadow-black/40 w-full mt-4 px-10"
        >
          <LinearGradient
            colors={["#1b1b1b", "#2b2b2b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="border-2 border-leagueGold py-3 items-center justify-center"
          >
            <Text
              className="text-leagueGold text-lg font-bold"
              style={{ fontFamily: "Cinzel_700Bold", letterSpacing: 1 }}
            >
              Next
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
}