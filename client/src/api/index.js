import axios from "axios";
import { token } from "../utils";

const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
};
    
export const getTopTracksS = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=30&time_range=short_term', { headers })

export const getTopTracksM = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=30&time_range=medium_term', { headers })

export const getTopTracksL = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=30&time_range=long_term', { headers })

export const getTopArtistsS = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=30&time_range=short_term', { headers })

export const getTopArtistsM = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=30&time_range=medium_term', { headers })

export const getTopArtistsL = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=30&time_range=long_term', { headers })

const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers })

const getFollowing = () => axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers })

const getPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists', { headers })

const getRecent = () => axios.get('https://api.spotify.com/v1/me/player/recently-played', { headers })

export const getUserInfo = () => axios 
                            .all([getUser(), getFollowing(), getPlaylists(), getRecent()])
                            .then(axios.spread((user, follow, pLists, recentlyPlayed) => ({
                                user: user.data,
                                follow: follow.data,
                                pLists: pLists.data,
                                recentlyPlayed: recentlyPlayed.data
                            })))
    