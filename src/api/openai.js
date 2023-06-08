const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

router.get("/", async (req, res) => {
  if (req.query) {
    console.log("🚀 ~ file: openai.js:8 ~ router.get ~ req.query:", req.query);
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
        status: 200,
        message: "Success",
        data: completion.data.choices[0].text,
      });
      // res.send({ data: completion.data.choices[0].text });
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:82 ~ apiFunction ~ error:",
        JSON.stringify(error)
      );
      res.json({
        status: error.status,
        message: error.message,
        data: error.data,
      });
    }

    // res.status(200).json({ data: response.data, source: "Api" });
  } else {
    res.status(200).json({ data: "" });
  }
});

module.exports = router;
