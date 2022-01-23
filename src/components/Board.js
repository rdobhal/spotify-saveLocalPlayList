import React from "react";

const Board = (props) => {
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
    props.onChange(newValue);
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
