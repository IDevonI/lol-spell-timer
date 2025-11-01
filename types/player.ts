export interface Account {
  gameName: string;
  tagLine: string;
  region: string;
  puuid: string;
}

export interface Summoner {
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface MiniSeries {
  target: number;
  wins: number;
  losses: number;
  progress: string;
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

export interface Profile {
  leagueEntries: LeagueEntry[];
  summoner: Summoner;
}