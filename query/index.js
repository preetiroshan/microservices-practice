const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// sample value of  allPostsWithComments = {
//   "postId" : {
//     id: "postId",
//     title,
//     comments: [
//       {
//         id: "commentId",
//         content,
//         status;
//       }
//     ]
//   }
// }
const allPostsWithComments = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    allPostsWithComments[id] = {
      id,
      title,
      comments: [],
    };
  } else if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    allPostsWithComments[postId].comments.push({
      id,
      content,
      status,
    });
  } else if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    // Find comment and update it as it is
    const commentToUpdate = allPostsWithComments[postId].comments.find(
      (comment) => {
        return comment.id === id;
      }
    );
    // We copy all the required properties, and not just status or content
    commentToUpdate.status = status;
    commentToUpdate.content = content;
  }
};
// Get list of all posts with details of all the comments
app.get("/posts", (req, res) => {
  console.log("Getting details of all posts", allPostsWithComments);
  res.send(allPostsWithComments);
});

// Api to consume events from the event service and update the data in queryservice
app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Event Received in Query Service", req.body);
  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("listening QueryService on 4002");
  const res = await axios.get("http://localhost:4004/events").catch((err) => {
    console.log("err", err);
  });

  if (res?.data) {
    res.data.events.forEach((event) => {
      const { type, data } = event;
      handleEvent(type, data);
    });
  }
  console.log("res", res);
});
