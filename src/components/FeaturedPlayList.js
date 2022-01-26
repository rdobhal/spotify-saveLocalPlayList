import React from "react";
import axios from "axios";
import { Credentials } from "./Credentials";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeaturedPlayLists } from "../redux/actions/playListActions";
import Board from "./Board";
import PlayList from "./PlayList";

const FeaturedPlayList = () => {
  const spotify = Credentials();
  const featuredPlayList = useSelector(
    (state) => state.featuredPlayLists.playLists
  );
  const localPlayLists = useSelector((state) => state.localPlayLists.playLists);
  const dispatch = useDispatch();
  const getFilteredPlaylist = (newPlayList) => {
    return newPlayList.filter(
      (x) => !localPlayLists.find((y) => x.id === y.id)
    );
  };
  const getFeaturedPlayListFromURL = () => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    })
      .then((tokenResponse) => {
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
          newPlayList = getFilteredPlaylist(newPlayList);
          dispatch(setFeaturedPlayLists(newPlayList));
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    getFeaturedPlayListFromURL();
  }, []);
  return (
    <Board id="board-1" className="board">
      <p>Featured playlist</p>
      <PlayList playlist={featuredPlayList} />
    </Board>
  );
};

export default FeaturedPlayList;
