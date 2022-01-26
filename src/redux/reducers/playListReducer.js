import { playListActionTypes } from "../constants/playListActionTypes";

const initialStateOfFeaturedPlayList = {
  playLists: [],
};

const initialStateOfSelectedPlayList = {
  playList: [],
};

const initialStateOfLocalPlayList = {
  playLists: [],
};

export const featuredPlayListReducer = (
  state = initialStateOfFeaturedPlayList,
  { type, payload }
) => {
  switch (type) {
    case playListActionTypes.GET_FEATURED_PLAYLIST:
      return { ...state, playLists: payload };
    case playListActionTypes.UPDATE_FEATURED_PLAYLIST:
      const newPlayList = state.playLists.filter((x) => x.id !== payload.id);
      return { ...state, playLists: newPlayList };
    default:
      return state;
  }
};

export const selectedPlayListReducer = (
  state = initialStateOfSelectedPlayList,
  { type, payload }
) => {
  switch (type) {
    case playListActionTypes.SELECT_PLAYLIST:
      return { ...state, playList: payload };
    default:
      return state;
  }
};
export const localPlayListReducer = (
  state = initialStateOfLocalPlayList,
  { type, payload }
) => {
  switch (type) {
    case playListActionTypes.SET_LOCAL_PLAYLIST:
      try {
        localStorage.setItem(
          "localPlayList",
          JSON.stringify([...state.playLists, payload])
        );
      } catch (err) {
        throw new Error(err);
      }
      return { ...state, playLists: [...state.playLists, payload] };
    default:
      let data = [];
      try {
        data = JSON.parse(localStorage.getItem("localPlayList")) || [];
      } catch (err) {
        throw new Error(err);
      }
      return { ...state, playLists: data };
  }
};
