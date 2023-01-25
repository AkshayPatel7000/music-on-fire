const express = require("express");
const { getPlaylistDetails } = require("../endpoints");
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

  let link = getPlaylistDetails(pid);
  console.log(link);
  const response = await get(link);
  console.log("getPlaylistDetails->>>>.");
  //   caching.put(aid, response.data, cacheTime);
  res.status(200).json({ data: response.data, source: "API" });
});

module.exports = router;
