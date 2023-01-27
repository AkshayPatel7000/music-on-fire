const express = require("express");
const { getProfile } = require("../endpoints");
const { get, post } = require("../get");
const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.uname;

  if (!query) {
    res.json({ error: "Invalid Arguments" });
    return;
  }
  let options = {
    method: "GET",
    headers: {
      "x-ig-app-id": "936619743392459",
      "x-ig-app-id": "oF30kb26MWMgPXPeHN9tHDs1NcwRAXIi",
    },
  };

  if (req.headers["x-ig-app-id"]) {
    options.headers["x-ig-app-id"] = req.headers["x-ig-app-id"];
  }

  const response = await get(getProfile(query), options);
  if (response.error) {
    res.status(400).json({ data: response.error, source: "API" });
  } else {
    res.status(200).json({ data: response.data, source: "API" });
  }
});
router.get("/getUrl", async (req, res) => {
  const image = req.query.url;

  if (!image) {
    res.json({ error: "Invalid Arguments" });
    return;
  }
  let options = {
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization: "Token 82c65a076d9cf49f2599e808de86fc85e3db5725",
      "Content-Type": "application/json",
    },
  };

  let imageResponse = await get(image, options);
  console.log("imageResponse", imageResponse.data);
  res.status(200).json({ data: imageResponse.data.output, source: "API" });

  //   res.status(200).json({ data: response.data, source: "API" });
});
router.post("/upScale", async (req, res) => {
  const image = req.body.image.split("%26").join("&");

  if (!image) {
    res.json({ error: "Invalid Arguments" });
    return;
  }

  let headersList = {
    Accept: "*/*",
    Authorization: "Token 82c65a076d9cf49f2599e808de86fc85e3db5725",
    "Content-Type": "application/json",
  };
  let bodyContent = JSON.stringify({
    version: "9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
    input: {
      img: image,
    },
  });

  let response = await post("https://api.replicate.com/v1/predictions", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  res.status(200).json({ data: response.data, source: "API" });
});

module.exports = router;
