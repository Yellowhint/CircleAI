const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
  const userMessage = req.body.message;
  const py = spawn("python3", ["bot.py"]);
  let result = "";

  py.stdin.write(JSON.stringify({ message: userMessage }));
  py.stdin.end();

  py.stdout.on("data", (data) => {
    result += data.toString();
  });

  py.stdout.on("end", () => {
    try {
      const reply = JSON.parse(result);
      res.json(reply);
    } catch (e) {
      res.status(500).json({ reply: "Error parsing Python reply." });
    }
  });

  py.stderr.on("data", (err) => {
    console.error("Python error:", err.toString());
    res.status(500).json({ reply: "Circle AI had an error." });
  });
});

app.listen(5000, () => {
  console.log("✅ Circle AI Node server running on http://localhost:5000");
});
