const fetch = require("node-fetch");

const get = async (url, options) => {
  const res = {};
  let x = (Math.random() * 100).toFixed(0);
  res.data = [];
  try {
    var headers = {
      "user-agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.${x} Safari/537.36 Edg/109.0.1518.${x}`,
      ...options,
    };
    // console.log("🚀 ~ file: get.js:12 ~ get ~ headers", headers);

    const d = await fetch(url, { headers });

    res.data = await d.json();
  } catch (error) {
    // res.error = error.message;
  }

  return res;
};
const post = async (url, options) => {
  const res = {};

  res.data = [];
  try {
    const d = await fetch(url, options);

    res.data = await d.json();
  } catch (error) {
    console.log(error.message);
    res.error = error.message;
  }

  return res;
};

module.exports = { get, post };
