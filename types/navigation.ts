import { Account } from './index';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Game: { account: Account };
};