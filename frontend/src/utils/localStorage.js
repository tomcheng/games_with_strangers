const PLAYER_ID_KEY = "_gws_player_id";
const PLAYER_NAME_KEY = "_gws_player_name";

export const setPlayerId = id => localStorage.setItem(PLAYER_ID_KEY, id);
export const getPlayerId = () => localStorage.getItem(PLAYER_ID_KEY);
export const setPlayerName = name => localStorage.setItem(PLAYER_NAME_KEY, name);
export const getPlayerName = () => localStorage.getItem(PLAYER_NAME_KEY);

