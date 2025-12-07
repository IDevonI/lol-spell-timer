import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useEffect, useState } from "react";
import { LeagueEntry, Profile } from "../types";
import { getProfile } from "../services/riotService";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProfileIconUrl, getTierEmblemUrl, getTierWingUrl } from "../utils/DataDragon";
import Accordion from "../components/Accordion";


interface ProfileScreenProps extends NativeStackScreenProps<RootStackParamList, 'Profile'> { };

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
    const { account } = route.params;
    const [profile, setProfile] = useState<Profile>({} as Profile);
    const [highestRankedEntry, setHighestRankedEntry] = useState<LeagueEntry>({} as LeagueEntry);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!account.puuid) return;
                const fetchedProfile = await getProfile(account.region, account.puuid);

                if (fetchedProfile.leagueEntries) {
                    const highestEntry = getHighestRankedEntry(fetchedProfile.leagueEntries);
                    setHighestRankedEntry(highestEntry ? highestEntry : {} as LeagueEntry);
                }
                JSON.stringify(fetchedProfile, null, 2)
                setProfile(fetchedProfile);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [account]);

    const getHighestRankedEntry = (entries: any[]) => {
        if (entries.length === 0) return null;
        const rankOrder = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'];
        entries.sort((a, b) => {
            const tierDiff = rankOrder.indexOf(b.tier) - rankOrder.indexOf(a.tier);
            if (tierDiff !== 0) return tierDiff;
            return b.leaguePoints - a.leaguePoints;
        });
        return entries[0];
    };

    return (
        <SafeAreaView className="flex-1 bg-[#0A1428] px-4" edges={['top', 'left', 'right']}>
            {loading ? (
                <View className="items-center justify-center flex-1">
                    <ActivityIndicator size="large" color="#c8aa6e"/>
                    <Text className="text-yellow-400 mt-6">Loading...</Text>
                </View>
            ) : (
                <View className="items-center mt-3">
                    <View className="items-center mt-4">
                        <Image
                            source={{ uri: getTierWingUrl(highestRankedEntry.tier) }}
                            style={{ width: 300, height: 300 }}
                            className="absolute -top-40 -right-15"
                        />
                        <Image
                            source={{ uri: getProfileIconUrl(profile.summoner.profileIconId) }}
                            style={{ width: 100, height: 100 }}
                            className="rounded-full"
                        />
                        <View className="items-center mt-8">
                            <Text className="text-yellow-400 text-2xl" style={{ fontFamily: "Cinzel_700Bold" }}>
                                {account.gameName}
                            </Text>
                            <Text className="text-yellow-500 text-lg">
                                #{account.tagLine}
                            </Text>
                            <Text className="text-yellow-500 text-lg">
                                Level: {profile.summoner?.summonerLevel ?? '-'}
                            </Text>
                        </View>
                    </View>

                    <Accordion title="Ranked Information" className="-mt-6">
                    {
                        
                        profile.leagueEntries.map((entry, index) => (
                            <View key={index} className="items-center -mt-24">
                                <Image
                                    source={{ uri: getTierEmblemUrl(entry.tier) }}
                                    style={{ width: 300, height: 300 }}
                                    className="-mb-32"
                                />
                                <Text className="text-yellow-400 text-xl font-semibold mt-2 text-center" style={{ fontFamily: "Cinzel_700Bold" }}>
                                    {entry.queueType.replaceAll('_', ' ')}
                                </Text>
                                <Text className="text-yellow-500 text-lg font-semibold mt-2">
                                    {entry.tier} {entry.rank} - {entry.leaguePoints} LP
                                </Text>
                            </View>
                        ))
                    }
                    </Accordion>

                    {/* <Text className="text-yellow-400">
                        {JSON.stringify(profile, null, 2)}
                    </Text> */}
                </View>
            )}
        </SafeAreaView>
    );
}

export default ProfileScreen;