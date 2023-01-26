const GetLaunchData = () =>
  `https://www.jiosaavn.com/api.php?__call=webapi.getLaunchData&api_version=4&_format=json&_marker=0&ctx=wap6dot0`;

const Search = (query) =>
  `https://www.jiosaavn.com/api.php?__call=autocomplete.get&query=${query}&_format=json&_marker=0&ctx=wap6dot0`;

const GetDetails = (id, type, page, n) =>
  `https://www.jiosaavn.com/api.php?__call=webapi.get&token=${id}&type=${type}&p=${page}&n=${n}&n_song=${n}&includeMetaTags=0&ctx=wap6dot0&api_version=4&_format=json&_marker=0`;

const GetSongDetails = (pid) =>
  `https://www.jiosaavn.com/api.php?__call=song.getDetails&_marker=0%3F_marker%3D0&_format=json&pids=${pid}`;

const getAlbumDetails = (aid) =>
  `https://www.jiosaavn.com/api.php?__call=content.getAlbumDetails&albumid=${aid}&api_version=4&_format=json&_marker=0&ctx=web6dot0`;

const getPlaylistDetails = (pid) =>
  `https://www.jiosaavn.com/api.php?__call=playlist.getDetails&listid=${pid}&api_version=4&_format=json&_marker=0&ctx=web6dot0`;

const GetLyrics = (pid) =>
  `https://www.jiosaavn.com/api.php?__call=lyrics.getLyrics&ctx=web6dot0&api_version=4&_format=json&_marker=0%3F_marker%3D0&lyrics_id=${pid}`;

const CreateQueue = (radio_name, station_type) =>
  `https://www.jiosaavn.com/api.php?language=hindi&pid=&query=&name=${radio_name}&mode=&artistid=&api_version=4&_format=json&_marker=0&ctx=web6dot0&__call=${
    station_type == "featured"
      ? "webradio.createFeaturedStation"
      : "webradio.createArtistStation"
  }`;

const GetSongsByStation = (stationid, n) =>
  `https://www.jiosaavn.com/api.php?__call=webradio.getSong&stationid=${stationid}&k=${n}&next=1&api_version=4&_format=json&_marker=0&ctx=wap6dot0`;

const GetMoreSongs = (query, page) =>
  `https://www.jiosaavn.com/api.php?p=${page}&q=${query}&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=40&__call=search.getResults`;

const AuthGetSong = (url) =>
  `https://www.jiosaavn.com/api.php?__call=song.generateAuthToken&url=${url}&bitrate=128&api_version=4&_format=json&ctx=web6dot0&_marker=0`;

// INSTA
const getInstaSearch = (query) =>
  `https://www.instagram.com/api/v1/web/search/topsearch/?context=blended&query=${query}&rank_token=0.4394261312303833&include_reel=true`;

module.exports = {
  GetLaunchData,
  Search,
  GetDetails,
  GetSongDetails,
  GetLyrics,
  CreateQueue,
  GetSongsByStation,
  GetMoreSongs,
  getAlbumDetails,
  getPlaylistDetails,
  AuthGetSong,
  getInstaSearch,
};
