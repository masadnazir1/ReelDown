const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const app = express();
const PORT = 4002;

app.use(
  cors({
    origin: "https://reeldown.galaxydev.pk",
    credentials: true,
  })
);
app.use(express.json());

app.post("/api/download", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  const python = spawn("python3", ["video_scraper.py", url]);

  let data = "";
  python.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  python.stderr.on("data", (err) => {
    console.error("Python stderr:", err.toString());
  });

  python.on("close", (code) => {
    try {
      const result = JSON.parse(data);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to parse response from Python" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
