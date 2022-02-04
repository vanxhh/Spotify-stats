import axios from "axios";
import { token } from "../utils";

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const getTopTracksS = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=30&time_range=short_term",
    { headers }
  );

const getTopTracksM = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=30&time_range=medium_term",
    { headers }
  );

const getTopTracksL = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=30&time_range=long_term",
    { headers }
  );

const getTopArtistsS = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=30&time_range=short_term",
    { headers }
  );

const getTopArtistsM = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=30&time_range=medium_term",
    { headers }
  );

const getTopArtistsL = () =>
  axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=30&time_range=long_term",
    { headers }
  );

const getUser = () => axios.get("https://api.spotify.com/v1/me", { headers });

const getFollowing = () =>
  axios.get("https://api.spotify.com/v1/me/following?type=artist", { headers });

const getPlaylists = () =>
  axios.get("https://api.spotify.com/v1/me/playlists", { headers });

const getRecent = () =>
  axios.get("https://api.spotify.com/v1/me/player/recently-played", {
    headers,
  });

export const getUserInfo = () => 
  axios
  .all([
    getUser(),
    getFollowing(),
    getPlaylists(),
    getRecent(),
    getTopArtistsS(),
    getTopArtistsM(),
    getTopArtistsL(),
    getTopTracksS(),
    getTopTracksM(),
    getTopTracksL()
  ]).then(
    axios.spread((
      user,
      follow,
      pLists,
      recentlyPlayed,
      topArtistsS,
      topArtistsM,
      topArtistsL,
      topTracksS,
      topTracksM,
      topTracksL) => ({
        user: user.data,
        follow: follow.data,
        pLists: pLists.data,
        recentlyPlayed: recentlyPlayed.data,
        topArtistsS: topArtistsS.data,
        topArtistsM: topArtistsM.data,
        topArtistsL: topArtistsL.data,
        topTracksS: topTracksS.data,
        topTracksM: topTracksM.data,
        topTracksL: topTracksL.data,
    }))
  );

const getTrack = id => 
  axios.get(
    `https://api.spotify.com/v1/tracks/${id}`,
    { headers }
  );

export const getTrackInfo = id =>
  axios.all([getTrack(id)])
  .then(
    axios.spread(track => ({
      track: track.data,
    }))
  );

const getArtist = id => 
  axios.get(
    `https://api.spotify.com/v1/artists/${id}`,
    { headers }
  );

export const getArtistInfo = id =>
  axios.all([getArtist(id)])
  .then(
    axios.spread(artist => ({
      artist: artist.data,
    }))
  );

const getPlaylist = id => 
  axios.get(
    `https://api.spotify.com/v1/playlists/${id}`,
    { headers }
  );

export const getPlaylistInfo = id =>
  axios.all([getPlaylist(id)])
  .then(
    axios.spread(playlist => ({
      playlist: playlist.data,
    }))
  );

