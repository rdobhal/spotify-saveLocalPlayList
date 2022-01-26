import { playListActionTypes } from "../constants/playListActionTypes";

export const setFeaturedPlayLists = (playlists) => {
  return {
    type: playListActionTypes.GET_FEATURED_PLAYLIST,
    payload: playlists,
  };
};
export const updateFeaturedPlayList = (playlists) => {
  return {
    type: playListActionTypes.UPDATE_FEATURED_PLAYLIST,
    payload: playlists,
  };
};

export const selectPlayList = (playlist) => {
  return {
    type: playListActionTypes.SELECT_PLAYLIST,
    payload: playlist,
  };
};

export const setLocalPlayList = (playlist) => {
  return {
    type: playListActionTypes.SET_LOCAL_PLAYLIST,
    payload: playlist,
  };
};
