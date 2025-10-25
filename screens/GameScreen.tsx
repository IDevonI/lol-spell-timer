import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

interface Champion {
  id: string;
  name: string;
  spells: string[];
}

export default function GameScreen({ route }: any) {
  const { summoner } = route.params;
  const [champions, setChampions] = useState<Champion[]>([]);
  const [spells, setSpells] = useState<any>({});

  useEffect(() => {
    // Fetch Data Dragon data
    const fetchData = async () => {
      const champRes = await fetch('https://ddragon.leagueoflegends.com/cdn/14.21.1/data/en_US/champion.json');
      const spellRes = await fetch('https://ddragon.leagueoflegends.com/cdn/14.21.1/data/en_US/summoner.json');
      const champData = await champRes.json();
      const spellData = await spellRes.json();
      setChampions(Object.values(champData.data));
      setSpells(spellData.data);
    };
    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-[#0A1428] p-4">
      <Text className="text-yellow-400 text-2xl font-bold mb-4">
        Current Game for {summoner}
      </Text>

      <FlatList
        data={champions.slice(0, 10)} // mock 10 players
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center mb-3 bg-[#16213E] p-3 rounded-2xl">
            <Image
              source={{ uri: `https://ddragon.leagueoflegends.com/cdn/14.21.1/img/champion/${item.id}.png` }}
              style={{ width: 48, height: 48, borderRadius: 8, marginRight: 8 }}
            />
            <Text className="text-white flex-1">{item.name}</Text>

            <View className="flex-row">
              {['SummonerFlash', 'SummonerHeal'].map((spellId) => (
                <TouchableOpacity key={spellId} className="mx-1">
                  <Image
                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/14.21.1/img/spell/${spellId}.png` }}
                    style={{ width: 50, height: 50, borderRadius: 6 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}
