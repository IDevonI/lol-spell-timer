import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useEffect, useState } from "react";
import { Profile } from "../types";
import { getProfile } from "../services/riotService";
import { View, Text } from "react-native";


type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation, route }: ProfileScreenProps) {
    const { account } = route.params;
    const [profile, setProfile] = useState<Profile>({} as Profile);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!account.puuid) return;
                const fetchedProfile = await getProfile(account.region, account.puuid);
                setProfile(fetchedProfile);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <View className="flex-1 bg-[#0A1428] p-4">
            <Text className="text-yellow-400 text-2xl font-bold mb-4">
                Profile for {account.gameName}#{account.tagLine}
            </Text>
            {loading ? (
                <Text className="text-yellow-400">Loading...</Text>
            ) : (
                <Text className="text-yellow-400">
                    {JSON.stringify(profile, null, 2)}
                </Text>
            )}
        </View>
    );
}
