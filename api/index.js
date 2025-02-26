const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get("/encode", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).json({
      error: "이미지 URL을 입력해주세요."
    });
  }

  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer"
    });
    const base64 = Buffer.from(response.data).toString("base64");
    const mimeType = response.headers["content-type"];
    res.json({
      base64: `data:${mimeType};base64,${base64}`
    });
  } catch (error) {
    res.status(500).json({
      error: "이미지를 가져올 수 없습니다.",
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;