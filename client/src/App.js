// IMPORTS
import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Playlists from "./components/Playlists/Playlists"
import Artists from "./components/Artists/Artists";
import Tracks from "./components/Tracks/Tracks";
import TrackInfo from "./components/Info/TrackInfo";
import ArtistInfo from "./components/Info/ArtistInfo";
import PlaylistInfo from "./components/Info/PlaylistInfo";
import NoMatch from "./components/NoMatch/NoMatch";
import { token } from "./utils";
import { logout } from "./utils";
import { getUserInfo } from "./api";


// CONTEXT
export const DataContext = createContext();


export default function App() {
  const [accessToken, setAccessToken] = useState("");
  const [userData, setUserData] = useState(null);
  const [userFollowing, setUserFollowing] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null);
  const [recents, setRecents] = useState(null);
  const [topArtistsS, setTopArtistsS] = useState(null);
  const [topArtistsM, setTopArtistsM] = useState(null);
  const [topArtistsL, setTopArtistsL] = useState(null);
  const [topTracksS, setTopTracksS] = useState(null);
  const [topTracksM, setTopTracksM] = useState(null);
  const [topTracksL, setTopTracksL] = useState(null);


  useEffect(() => {
    setAccessToken(token);

    const fetchData = async () => {
      const {
        user,
        follow,
        pLists,
        recentlyPlayed,
        topArtistsS,
        topArtistsM,
        topArtistsL,
        topTracksS,
        topTracksM,
        topTracksL
      } = await getUserInfo();

      setUserData(user);
      setUserFollowing(follow);
      setUserPlaylists(pLists);
      setRecents(recentlyPlayed);
      setTopArtistsS(topArtistsS);
      setTopArtistsM(topArtistsM);
      setTopArtistsL(topArtistsL);
      setTopTracksS(topTracksS);
      setTopTracksM(topTracksM);
      setTopTracksL(topTracksL);
    };
    fetchData();
  }, []);


  // CONTEXT VALUE OBJECT
  const data = {
    userData: userData,
    userFollowing: userFollowing,
    userPlaylists: userPlaylists,
    recents: recents,
    topArtistsS: topArtistsS,
    topArtistsM: topArtistsM,
    topArtistsL: topArtistsL,
    topTracksS: topTracksS,
    topTracksM: topTracksM,
    topTracksL: topTracksL
  }

  return (
    <div className='bg-black-primary min-h-screen'>
      {accessToken ?
        <>
          <Navbar logout={logout} />
          <DataContext.Provider value={data}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/playlists' element={<Playlists />} />
              <Route path='/artists' element={<Artists />} />
              <Route path='/tracks' element={<Tracks />} />
              <Route path='/track/:trackID' element={<TrackInfo />} />
              <Route path='/artist/:artistID' element={<ArtistInfo />} />
              <Route path='/playlist/:playlistID' element={<PlaylistInfo />} />
              <Route path='*' element={<NoMatch />} />
            </Routes>
          </DataContext.Provider>
        </>
        :
        <Login />
      }
    </div>
  );
}
