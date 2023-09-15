const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(bodyParser.json());
app.use(cors());

// event body will be of type: {type : string, data: any}
app.post("/events", async (req, res) => {
  console.log("Event Received in EventBus", req.body);
  // Share event with post and comment service
  await axios.post("http://localhost:4000/events", req.body);
  await axios.post("http://localhost:4001/events", req.body);
  res.send({});
});

app.listen(4004, () => {
  console.log("Listening eventbus on port 4004");
});
