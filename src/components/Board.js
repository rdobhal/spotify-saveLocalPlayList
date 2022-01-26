import React from "react";
import {
  setLocalPlayList,
  updateFeaturedPlayList,
} from "../redux/actions/playListActions";
import { useDispatch } from "react-redux";

const Board = (props) => {
  const dispatch = useDispatch();
  const drop = (e) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData("card_id");
    const card = document.getElementById(card_id);
    card.style.display = "block";
    const newValue = {
      id: card.id,
      name: card.innerText,
      imageURL: card.getElementsByTagName("img")[0].src,
    };
    dispatch(setLocalPlayList(newValue));
    dispatch(updateFeaturedPlayList(newValue));
  };
  const dragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div
      id={props.id}
      onDrop={drop}
      className={props.className}
      onDragOver={dragOver}
    >
      {props.children}
    </div>
  );
};

export default Board;
