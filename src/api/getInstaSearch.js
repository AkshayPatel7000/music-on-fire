const express = require("express");

const { getInstaSearch } = require("../endpoints");
const { get } = require("../get");
const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.query;

  if (!query) {
    res.json({ error: "Invalid Arguments" });
    return;
  }
  let options = {
    method: "GET",
    headers: {
      "x-ig-app-id": "936619743392459",
    },
  };

  if (req.headers["x-ig-app-id"]) {
    options.headers["x-ig-app-id"] = req.headers["x-ig-app-id"];
  }

  const response = await get(getInstaSearch(query), options);
  console.log("req->>>", response);
  res.status(200).json({ data: response.data, source: "API" });
  // console.log("req->>>", data);
  // res.status(200).json({ data: data, source: "API" });
});

module.exports = router;
