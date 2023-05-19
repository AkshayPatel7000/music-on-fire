const express = require("express");
const { GetLaunchData } = require("../endpoints");
const { get } = require("../get");
const cache = require("memory-cache");
const router = express.Router();

const LaunchDataCache = new cache.Cache();
const cacheTime = 60 * 60 * 1000; //time in mili seconds

router.get("/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (!LaunchDataCache.get("data")) {
    var header = {
      cookie:
        "DL=english;L=hindi%2Cenglish%2Cpunjabi%2Crajasthani%2Cbhojpuri%2Charyanvi",
      "accept-language": "en-IN,en-GB;q=0.9,en;q=0.8,en-US;q=0.7",
    };
    const response = await get(GetLaunchData(), header);
    res.status(200).json({ data: response.data, source: "Api" });
    LaunchDataCache.put("data", response.data, cacheTime);
  } else {
    res
      .status(200)
      .json({ data: LaunchDataCache.get("data"), source: "cache" });
  }
});

module.exports = router;
