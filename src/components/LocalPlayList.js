import React from "react";
import { useSelector } from "react-redux";
import Board from "./Board";
import PlayList from "./PlayList";

const LocalPlayList = () => {
  const localPlayLists = useSelector((state) => state.localPlayLists.playLists);
  return (
    <Board id="board-2" className="board">
      <p>Create your playlist</p>
      <PlayList playlist={localPlayLists} />
    </Board>
  );
};

export default LocalPlayList;
