const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(bodyParser.json());
app.use(cors());

const events = [];
// event body will be of type: {type : string, data: any}
app.post("/events", async (req, res) => {
  console.log("Event Received in EventBus", req.body);
  const event = req.body;
  events.push(event);
  // Share event with post and comment service
  await axios.post("http://localhost:4000/events", req.body).catch((err) => {
    console.log("err", err);
  });
  await axios.post("http://localhost:4001/events", req.body).catch((err) => {
    console.log("err", err);
  });
  await axios.post("http://localhost:4002/events", req.body).catch((err) => {
    console.log("err", err);
  });
  await axios.post("http://localhost:4003/events", req.body).catch((err) => {
    console.log("err", err);
  });
  res.send({ status: "OK" });
});

app.get("/events", async (req, res) => {
  res.send({
    events,
  });
});

app.listen(4004, () => {
  console.log("Listening eventbus on port 4004");
});
