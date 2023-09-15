const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  const commentsForPost = commentsByPostId[id] || [];
  res.send(commentsForPost);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  const id = req.params.id;
  const newComment = {
    id: randomBytes(4).toString("hex"),
    content,
  };
  const commentsForPost = commentsByPostId[id] || [];
  commentsForPost.push(newComment);
  commentsByPostId[id] = commentsForPost;
  await axios.post("http://localhost:4004/events", {
    type: "CommentCreated",
    data: {
      id: newComment.id, // This is comment id
      content,
      postId: id,
    },
  });
  res.status(201).send({
    commentsByPostId,
    newComment,
  });
});

app.post("/events", async (req, res) => {
  console.log("Event Received in Comment Service", req.body);
  res.send({});
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
