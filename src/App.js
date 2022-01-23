import "./App.css";
import Board from "./components/Board";
import Card from "./components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Credentials } from "./components/Credentials";

function App() {
  const spotify = Credentials();
  const [playList, setPlayList] = useState([]);
  const [localPlaylist, setLocalPlaylist] = useState(
    JSON.parse(window.localStorage.getItem("userPlayList")) || []
  );

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      axios("https://api.spotify.com/v1/browse/featured-playlists", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenResponse.data.access_token,
        },
        method: "GET",
      }).then((playlist) => {
        let newPlayList = playlist.data.playlists.items.map((val) => {
          return {
            id: val.id,
            name: val.name,
            imageURL: val.images[0].url,
          };
        });
        newPlayList = newPlayList.filter(
          (x) => !localPlaylist.find((y) => x.id === y.id)
        );
        setPlayList([...newPlayList]);
      });
    });
  }, [spotify.ClientId, spotify.ClientSecret]);
  const onChangeHandler = (newValue) => {
    if (newValue) {
      const newPlayList = playList.filter((x) => x.id !== newValue.id);
      setPlayList([...newPlayList]);
      setLocalPlaylist([...localPlaylist, newValue]);
    }
  };
  useEffect(() => {
    localStorage.setItem("userPlayList", JSON.stringify(localPlaylist));
  }, [localPlaylist]);
  return (
    <div className="App">
      <main className="flexbox">
        <Board id="board-1" className="board">
          <p>Featured playlist</p>
          {playList.map((val, index) => {
            return (
              <Card
                id={val.id}
                className="card"
                draggable="true"
                key={index}
                playlistName={val.name}
              >
                <div>
                  {
                    <img
                      src={val.imageURL}
                      alt="Avatar"
                      style={{ width: "100%", height: "50%" }}
                    />
                  }
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
          })}
        </Board>
        <Board id="board-2" className="board" onChange={onChangeHandler}>
          <p>Create your playlist</p>
          {localPlaylist.map((val, index) => {
            return (
              <Card
                id={val.id}
                className="card"
                draggable="true"
                key={index}
                playlistName={val.name}
              >
                <div>
                  {
                    <img
                      src={val.imageURL}
                      alt="Avatar"
                      style={{ width: "100%", height: "50%" }}
                    />
                  }
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
          })}
        </Board>
      </main>
    </div>
  );
}

export default App;
