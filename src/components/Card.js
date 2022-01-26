import React from "react";
import { useDispatch } from "react-redux";
import { selectPlayList } from "../redux/actions/playListActions";

const Card = (props) => {
  const dispatch = useDispatch();
  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData("card_id", target.id);
    const newValue = {
      id: target.id,
      name: target.innerText,
      imageURL: target.getElementsByTagName("img")[0].src,
    };
    dispatch(selectPlayList(newValue));
  };
  const dragOver = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      id={props.id}
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}
      className={props.className}
    >
      {props.children === undefined ? "Loading...." : props.children}
    </div>
  );
};

export default Card;
