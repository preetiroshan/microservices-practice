const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const allPostsWithComments = {};

app.get("/posts", (req, res) => {
  console.log("Getting details of all posts", allPostsWithComments);
  res.send(allPostsWithComments);
});

// Api to consume events from the event service and update the data in queryservice
app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  res.send({});
});

app.listen(4003, () => {
  console.log("Listening ModerationService on 4003");
});
