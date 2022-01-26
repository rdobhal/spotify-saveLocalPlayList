import React from "react";
import Card from "./Card";

function PlayList({ playlist }) {
  return (
    <>
      {playlist
        ? playlist.map((val, index) => {
            return (
              <Card
                id={val.id}
                className="card"
                draggable="true"
                key={index}
                playlistName={val.name}
              >
                <div>
                  <img
                    src={val.imageURL}
                    alt="Avatar"
                    style={{ width: "100%", height: "50%" }}
                  />
                </div>
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: "10px",
                    textTransform: "capitalize",
                    textShadow: "2px 2px 5px red",
                  }}
                >
                  {val.name}
                </div>
              </Card>
            );
          })
        : "No playlist"}
      ;
    </>
  );
}

export default PlayList;
