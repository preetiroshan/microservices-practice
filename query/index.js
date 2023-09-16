const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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
//         content
//       }
//     ]
//   }
// }
const allPostsWithComments = {};

// Get list of all posts with details of all the comments
app.get("/posts", (req, res) => {
  console.log("Getting details of all posts", allPostsWithComments);
  res.send(allPostsWithComments);
});

// Api to consume events from the event service and update the data in queryservice
app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Event Received in Query Service", req.body);
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
  }
  res.send({});
});

app.listen(4002, () => {
  console.log("listening QueryService on 4002");
});
