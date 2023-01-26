const express = require("express");
const { getInstaSearch } = require("../endpoints");
const { get } = require("../get");
const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.query;
  console.log("req->>>", req.headers["x-ig-app-id"]);
  if (!query) {
    res.json({ error: "Invalid Arguments" });
    return;
  }
  let options = {
    headers: {
      "x-ig-app-id": "936619743392459",
    },
  };
  if (req.headers["x-ig-app-id"]) {
    options.headers["x-ig-app-id"] = req.headers["x-ig-app-id"];
  }

  const response = await get(getInstaSearch(query), options);
  res.status(200).json({ data: response.data, source: "API" });
});

module.exports = router;
