const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

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
  if (type === "CommentCreated") {
    console.log("Comment Moderation required for ", req.body);
    const newStatus = data.content.includes("no") ? "rejected" : "approved";

    await axios
      .post("http://localhost:4004/events", {
        type: "CommentModerated",
        data: {
          ...data,
          status: newStatus,
        },
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Listening ModerationService on 4003");
});
