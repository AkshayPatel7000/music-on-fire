const express = require("express");
const { default: fetch } = require("node-fetch");
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
    headers: { "x-ig-app-id": "936619743392459" },
  };

  if (req.headers["x-ig-app-id"]) {
    options.headers["x-ig-app-id"] = req.headers["x-ig-app-id"];
  }

  const response = await fetch(
    `https://www.instagram.com/api/v1/web/search/topsearch/?context=blended&query=${query}&rank_token=0.4808311025313079&include_reel=false`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-IN,en-GB;q=0.9,en;q=0.8,en-US;q=0.7",
        "sec-ch-prefers-color-scheme": "dark",
        "sec-ch-ua":
          '"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-asbd-id": "198387",
        "x-csrftoken": "YLQ1OtXzJBrwK0h7R5lU9NAqJJkA6w8j",
        "x-ig-app-id": "936619743392459",
        "x-ig-www-claim":
          "hmac.AR2eRPImtyVtjW0CtydD_nX3OMv-L8JQXx8tXP-TsE2mqJJF",
        "x-requested-with": "XMLHttpRequest",

        "Referrer-Policy": "strict-origin-when-cross-origin",
      },

      method: "GET",
    }
  );
  var data = await response.json();
  // const response = await get(getInstaSearch(query), options);
  console.log("req->>>", data);
  res.status(200).json({ data: data, source: "API" });
});

module.exports = router;
