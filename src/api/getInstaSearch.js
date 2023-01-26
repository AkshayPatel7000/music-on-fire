const express = require("express");
const { getInstaSearch } = require("../endpoints");
const { get } = require("../get");
const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.query;
  console.log("req->>>", req);
  if (!query) {
    res.json({ error: "Invalid Arguments" });
    return;
  }
  const response = await get(getInstaSearch(query));
  res.status(200).json({ data: response.data, source: "API" });
});

module.exports = router;
