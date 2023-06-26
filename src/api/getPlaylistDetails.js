const express = require("express");
const { getPlaylistDetails, GetDetails, AuthGetSong } = require("../endpoints");
const { get } = require("../get");
const router = express.Router();
const cache = require("memory-cache");

const caching = new cache.Cache();
const cacheTime = 20 * 60 * 1000; //time in mili seconds

router.get("/", async (req, res) => {
  const pid = req.query.pid;
  console.log(pid);
  if (!pid) {
    res.json({ error: "Invalid Arguments" });
    return;
  }
  if (caching.get(pid)) {
    res.status(200).json({ data: caching.get(pid), source: "cache" });
    return;
  }

  let link = getPlaylistDetails(pid);
  console.log(link);
  const response = await get(link);
  var data = response.data;

  var final_data = data?.list?.map(async (res) => {
    var url = res.more_info.encrypted_media_url.split("+").join("%2B");
    url.split("/").join("%2");
    var authLink = AuthGetSong(url);
    var albumData = await get(authLink).then((res) => res);

    var id = res.id;
    var songurl = await get(
      `https://music-on-fire.vercel.app/api/v1/getsongurl?id=${id}&bitrate=128`
    );
    return { ...res, songUrl: albumData.data.auth_url };
  });

  Promise.all(final_data)
    .then((resp) => {
      // console.log("final->");
      data.list = resp;
      console.log("🚀 ~ file: getPlaylistDetails.js:34 ~ .then ~ data", data);

      res.status(200).json({ data: data, source: "API" });
    })
    .catch((err) => {
      res.status(200).json({ data: response.data, source: "API" });
    });
  caching.put(pid, response.data, cacheTime);
});

module.exports = router;
