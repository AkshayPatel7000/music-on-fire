const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

router.get("/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (req.query) {
    try {
      const query = req.query.query;
      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: query,
      });

      res.json({
        message: "Success",
        data: completion.data.choices[0].text,
      });
      // res.send({ data: completion.data.choices[0].text });
    } catch (error) {
      console.log("🚀 ~ file: index.js:82 ~ apiFunction ~ error:", error);
      res.json({
        message: "Failed",
        data: "",
      });
    }

    // res.status(200).json({ data: response.data, source: "Api" });
  } else {
    res.status(200).json({ data: "" });
  }
});

module.exports = router;
