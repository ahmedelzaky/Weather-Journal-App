// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require(`express`);

// Require BodyParser

const bodyParser = require(`body-parser`);

// Start up an instance of app

const app = express();

// Set Up The Port

const Port = 3000;

/* Middleware*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

app.listen(Port, () => {
  console.log(`Server is running on  http://localhost:${Port}`);
});

// send projectData object data.
app.get("/all", sendData);
function sendData(req, res) {
  res.send(projectData);
  //reset object to default value after finishing processes.
  projectData = {};
}
//add the data recived to The projectData object.
app.post("/add", addData);
function addData(req, res) {
  console.log(req.body);
  newData = {
    temp: req.body.temp,
    temp_max: req.body.temp_max,
    date: req.body.date,
    content: req.body.content,
  };
  projectData = newData;
}
