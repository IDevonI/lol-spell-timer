import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Cinzel_700Bold } from "@expo-google-fonts/cinzel";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Account } from '../types/index';
import CustomPicker from "../components/CustomPicker";

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
      navigation.navigate('Profile', { account: selectedAccount });
    } else {
      Alert.alert("Error", "No account selected or available.");
    }
  };

  const handleDeleteAccount = async (puuidToDelete: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const updatedAccounts = savedAccounts.filter(
              (account) => account.puuid !== puuidToDelete
            );
            setSavedAccounts(updatedAccounts);
            await saveAccountsToStorage(updatedAccounts);
            setSelectedAccount(updatedAccounts[0] || ({} as Account));
            if (updatedAccounts.length === 0) setSelectedAccount({} as Account);
          },
        },
      ]
    );
  };

  const saveAccountsToStorage = async (accounts: Account[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
    } catch (e) {
      console.log("Error saving accounts:", e);
      Alert.alert("Error", "Failed to save accounts.");
    }
  };

  const handelSelectAccount = async (account: Account) => setSelectedAccount(account);

  const handleAddAccount = () => navigation.navigate("Login");

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

        <CustomPicker<Account>
          items={savedAccounts}
          selectedItem={selectedAccount}
          onSelect={handelSelectAccount}
          onDelete={handleDeleteAccount}
          renderItemLabel={(account: Account) => `${account.gameName}#${account.tagLine} (${account.region})`}
          keyExtractor={(item: Account, index) => item.puuid || index.toString()}
          navigation={navigation}
          placeholder="Select an account"
          onPressButton={handleAddAccount}
        />

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleNext}
          className="overflow-hidden shadow-lg shadow-black/40 w-64 mt-4"
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