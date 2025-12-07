import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.19:3000/api/riot';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAccount = async (gameName: string, tagLine: string) => {
  try {
    const response = await api.get(`/account/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`);
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

export const getProfile = async (region: string, puuid: string) => {
  try {
    const response = await api.get(`/profile/${region}/${puuid}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
