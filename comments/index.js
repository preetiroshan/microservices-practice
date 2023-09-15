const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  const commentsForPost = commentsByPostId[id] || [];
  res.send(commentsForPost);
});

app.post("/posts/:id/comments", (req, res) => {
  const { content } = req.body;
  const id = req.params.id;
  const newComment = {
    id: randomBytes(4).toString("hex"),
    content,
  };
  const commentsForPost = commentsByPostId[id] || [];
  commentsForPost.push(newComment);
  commentsByPostId[id] = commentsForPost;
  res.status(201).send({
    commentsByPostId,
    newComment,
  });
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
