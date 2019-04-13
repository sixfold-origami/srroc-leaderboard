const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const logger = require("morgan");
var cors = require('cors');

const userRoute = require('./routes/user');
const racerRoute = require('./routes/racer');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const dbRoute = process.env.MONGODB_URI || "";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("Connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// middleware
app.use(cors()); // i don't actually know what this is
app.use(bodyParser.urlencoded({ extended: false })); // body parsing
app.use(bodyParser.json());
app.use(logger("dev")); // mogan logging i guess? i never use this T.T
app.use(express.static(path.join(__dirname, "client", "build"))); // for serving up the clientside code

// models and routes
require('./models/user');
require('./config/passport');

// api routes
app.use('/api/user', userRoute);
app.use('/api/racer', racerRoute);

// catch all route for sending client code (SHOULD BE THE LAST ROUTE IN THE FILE)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// launch our backend into a port
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
