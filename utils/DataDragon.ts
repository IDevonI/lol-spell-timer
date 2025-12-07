import Constants from 'expo-constants';

const dataDragonVersion = Constants.manifest?.extra?.dataDragonVersion || '15.24.1';

export const getProfileIconUrl = (iconId: number): string => {
    return `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/profileicon/${iconId}.png`;
}

export const getChampionSplashArtUrl = (championName: string, skinNumber: number): string => {
    return `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/splash/${championName}_${skinNumber}.jpg`;
}

export const getChampionSquareIconUrl = (championName: string): string => {
    return `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/${championName}.png`;
}

export const getItemIconUrl = (itemId: number): string => {
    return `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/item/${itemId}.png`;
}

export const getSpellIconUrl = (spellName: string): string => {
    return `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/spell/${spellName}.png`;
}

export const getTierEmblemUrl = (tier: string): string => {
    return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-emblem/emblem-${tier.toLowerCase()}.png`;
}

export const getTierWingUrl = (tier: string): string => {
    return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-emblem/wings/wings_${tier.toLowerCase()}.png`;
}