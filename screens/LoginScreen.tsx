import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Cinzel_700Bold } from "@expo-google-fonts/cinzel";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Account } from '../types/index';
import { getAccount } from '../services/riotService';
import { Alert } from "../utils/Alert";

const regions = [
  { label: "EU West (EUW1)", value: "euw1" },
  { label: "EU Nordic & East (EUN1)", value: "eun1" },
  { label: "North America (NA1)", value: "na1" },
  { label: "Korea (KR)", value: "kr" },
  { label: "Brazil (BR1)", value: "br1" },
  { label: "Latin America North (LA1)", value: "la1" },
  { label: "Latin America South (LA2)", value: "la2" },
  { label: "Oceania (OC1)", value: "oc1" },
  { label: "Japan (JP1)", value: "jp1" },
  { label: "Turkey (TR1)", value: "tr1" },
  { label: "Russia (RU)", value: "ru" },
];

const STORAGE_KEY = "@lol_accounts";

interface LoginScreenProps extends NativeStackScreenProps<RootStackParamList, 'Login'> { };

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [region, setRegion] = useState("euw1");
  const [accounts, setAccounts] = useState<Account[]>([]);

  const [fontsLoaded] = useFonts({ Cinzel_700Bold });

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setAccounts(JSON.parse(stored));
        console.log(JSON.parse(stored || "[]"));
      } catch (e) {
        console.log("Error loading accounts:", e);
      }
    })();
  }, []);

  const saveAccountsToStorage = async (newAccounts: Account[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAccounts));
    } catch (e) {
      console.log("Error saving accounts:", e);
      Alert.error("Error", "Failed to save account. Try again.");
    }
  };

  const handleSave = async () => {
    if (!gameName.trim() || !tagLine.trim()) {
      Alert.warn("Warning", "Please enter both Summoner Name and tagLine.");
      return;
    }

    try {
      const account: Account = await getAccount(gameName.trim(), tagLine.trim());

      const exists = accounts.find(
        (acc) =>
          acc.gameName === account.gameName &&
          acc.tagLine === account.tagLine &&
          acc.region === region
      );

      if (exists) {
        navigation.navigate("Game", { account: exists });
      }

      const newAccount: Account = {
        gameName: account.gameName,
        tagLine: account.tagLine,
        region,
        puuid: account.puuid,
      };
      const updatedAccounts = [...accounts, newAccount];
      setAccounts(updatedAccounts);
      await saveAccountsToStorage(updatedAccounts);

      Alert.success("Success", "Account saved!");
      setGameName("");
      setTagLine("");
      setRegion("euw1");
      navigation.navigate("Home");
    } catch (e) {
      console.log("Error fetching summoner data:", e);
      Alert.error("Error", "Summoner name not found or API issue. Check your input.");
    }
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-leagueNavy" edges={['top', 'left', 'right']}>
        <View className="flex-1 justify-center items-center bg-leagueNavy">
          <Text className="text-white">Loading fonts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-leagueNavy" edges={['top', 'left', 'right']}>
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
              className="text-leagueGold text-xl text-center leading-tight w-full mb-2"
              style={{ fontFamily: "Cinzel_700Bold", letterSpacing: 2 }}
            >
              Insert your info
            </Text>
          </View>

          <View className="flex-row items-center mb-4 w-full">
            <TextInput
              value={gameName}
              onChangeText={setGameName}
              placeholder="Summoner name"
              placeholderTextColor="#aaa"
              className="flex-1 bg-leaguePanel text-white rounded-l-xl px-4 py-3"
            />
            <TextInput
              value={tagLine}
              onChangeText={setTagLine}
              placeholder="#tagLine"
              placeholderTextColor="#aaa"
              className="w-48 bg-leaguePanel text-white rounded-r-xl px-2 py-3 border-l-2 border-transparent"
            />
          </View>

          <View className="bg-leaguePanel rounded-xl mb-8 w-full">
            <Picker
              selectedValue={region}
              onValueChange={(value) => setRegion(value)}
              dropdownIconColor="white"
              style={{ color: "white" }}
            >
              {regions.map((r) => (
                <Picker.Item key={r.value} label={r.label} value={r.value} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSave}
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
                Save
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default LoginScreen;