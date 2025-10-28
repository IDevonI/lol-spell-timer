export type Account = {
  gameName: string;
  tagLine: string;
  region: string;
  puuid: string;
};

export type CurrentGameInfo = {
  gameId: number;
  gameType: string;
  gameStartTime: number;
  mapId: number;
  gameLength: number;
  platformId: string;
  gameMode: string;
  bannedChampions: Array<BannedChampion>;
  observers: Observer;
  participants: Array<CurrentGameParticipant>;
};

export type BannedChampion = {
  pickTurn: number;
  championId: number;
  teamId: number;
};

export type Observer = {
  encryptionKey: string;
};

export type CurrentGameParticipant = {
  championId: number;
  perks: Perks;
  profileIconId: number;
  bot: boolean;
  teamId: number;
  puuid: string;
  spell1Id: number;
  spell2Id: number;
  gameCustomizationObjects: Array<GameCustomizationObject>;
};

export type Perks = {
  perkIds: Array<number>;
  perkStyle: number;
  perkSubStyle: number;
};

export type GameCustomizationObject = {
  category: string;
  content: string;
}; 

export type Profile = {
  leagueEntries: LeagueEntry[];
  summoner: Summoner;
}

export interface Summoner {
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}
export interface LeagueEntry {
  leagueId: string;
  puuid: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  hotStreak: boolean;
  veteran: boolean;
  freshBlood: boolean;
  inactive: boolean;
  miniSeries?: MiniSeries;
}

export interface MiniSeries {
  target: number;
  wins: number;
  losses: number;
  progress: string;
}