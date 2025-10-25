import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.18:3000/api/riot';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getSummoner = async (region: string, summonerName: string) => {
  try {
    const response = await api.get(`/summoner/${region}/${encodeURIComponent(summonerName)}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getActiveGame = async (region: string, summonerId: string) => {
  try {
    const response = await api.get(`/active-game/${region}/${summonerId}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};