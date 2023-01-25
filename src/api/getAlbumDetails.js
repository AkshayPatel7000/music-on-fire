const express = require("express");
const { getAlbumDetails } = require("../endpoints");
const { get } = require("../get");
const router = express.Router();
const cache = require("memory-cache");

const caching = new cache.Cache();
const cacheTime = 20 * 60 * 1000; //time in mili seconds

router.get("/", async (req, res) => {
  const aid = req.query.aid;

  console.log(aid);
  if (!aid) {
    res.json({ error: "Invalid Arguments" });
    return;
  }

  let link = getAlbumDetails(aid);
  console.log(link);
  const response = await get(link);
  console.log("getAlbumDetails->>>>.", JSON.stringify(response?.data));
  //   caching.put(aid, response.data, cacheTime);
  res.status(200).json({ data: response.data, source: "API" });
});

module.exports = router;
