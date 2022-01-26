import { combineReducers } from "redux";
import {
  featuredPlayListReducer,
  selectedPlayListReducer,
  localPlayListReducer,
} from "./playListReducer";

const reducers = combineReducers({
  featuredPlayLists: featuredPlayListReducer,
  selectedPlayList: selectedPlayListReducer,
  localPlayLists: localPlayListReducer,
});
export default reducers;
