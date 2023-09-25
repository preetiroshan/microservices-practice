const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");
  posts[id] = {
    id,
    title,
  };
  await axios
    .post("http://localhost:4004/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => {
      console.log("error while posting comment", err);
    });
  res.send(posts[id]);
});

app.post("/events", async (req, res) => {
  console.log("Event Received in post service", req.body);
  res.send({});
});

app.listen(4000, () => {
  console.log("new version"); // temp log for checking deployment updation
  console.log(`Example app listening on port 4000`);
});
