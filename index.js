const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const translate = require("@vitalets/google-translate-api");

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  app.use(cors());
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.post("/", async (req, res) => {
  const { text, lang } = req.body;
  try {
    const translated = await translate(text, { to: lang });
    res.send(JSON.stringify({ text: translated.text }));
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, console.log("server running"));
