import axios from "axios";

const expiry = 3600 * 1000;

const getParams = () => {
  const params = {};
  let exe;
  const reg = /([^&;=]+)=?([^&;]*)/g;
  const loc = window.location.hash.substring(1);
  while ((exe = reg.exec(loc))) {
    params[exe[1]] = decodeURIComponent(exe[2]);
  }
  return params;
};

const setTokenTime = () =>
  window.localStorage.setItem("spotify_access_time", Date.now());

const setLocalAccessToken = (token) => {
  setTokenTime();
  window.localStorage.setItem("spotify_access_token", token);
};

const setLocalRefreshToken = (token) =>
  window.localStorage.setItem("spotify_refresh_token", token);

const getTokenTime = () => window.localStorage.getItem("spotify_access_time");

const getLocalAccessToken = () =>
  window.localStorage.getItem("spotify_access_token");

const getLocalRefreshToken = () =>
  window.localStorage.getItem("spotify_refresh_token");

const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (err) {
    console.error(err);
  }
};

const getAccessToken = () => {
  const { error, access_token, refresh_token } = getParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  if (Date.now() - getTokenTime() > expiry) {
    console.warn("Access token expired, refreshing");
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  if (
    (!localAccessToken || localAccessToken === "undefined") &&
    access_token !== "undefined"
  ) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
  }
  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem("spotify_access_time");
  window.localStorage.removeItem("spotify_access_token");
  window.localStorage.removeItem("spotify_refresh_token");
  window.location.replace("/");
};

export const timeCalc = duration => {
  const min = Math.floor(duration / 60000);
  const sec = Math.floor((duration % 60000) / 1000);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};

export const followerCalc = followers => {
  return Number(followers) >= 1.0e9
    ? (Number(followers) / 1.0e9).toFixed(1) + "B"
    :
    Number(followers) >= 1.0e6
    ? (Number(followers) / 1.0e6).toFixed(1) + "M"
    :
    Number(followers) >= 1.0e3
    ? (Number(followers) / 1.0e3).toFixed(1) + "K"
    : Number(followers);
}
