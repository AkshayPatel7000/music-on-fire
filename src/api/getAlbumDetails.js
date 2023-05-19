const express = require("express");
const { getAlbumDetails, AuthGetSong } = require("../endpoints");

const { get } = require("../get");
const router = express.Router();
const cache = require("memory-cache");

const caching = new cache.Cache();
const cacheTime = 20 * 60 * 1000; //time in mili seconds

router.get("/", async (req, res) => {
  const aid = req.query.aid;

  if (!aid) {
    res.json({ error: "Invalid Arguments" });
    return;
  }
  if (caching.get(aid)) {
    res.status(200).json({ data: caching.get(aid), source: "cache" });
    return;
  }

  let link = getAlbumDetails(aid);
  console.log(link);
  const response = await get(link);
  let finalData = response.data;

  var newAlbumData = response?.data?.list?.map(async (album) => {
    var url = album.more_info.encrypted_media_url.split("+").join("%2B");
    url.split("/").join("%2");
    var authLink = AuthGetSong(url);
    var albumData = await get(authLink).then((res) => res);

    return { ...album, songUrl: albumData.data.auth_url };
  });
  Promise.all(newAlbumData)
    .then((resp) => {
      finalData = { ...response.data, list: resp };
      res
        .status(200)
        .json({ data: { ...response.data, list: resp }, source: "API" });
    })
    .catch((err) => {
      res.status(200).json({ data: response.data, source: "API" });
    });

  caching.put(aid, response.data, cacheTime);
});

module.exports = router;
