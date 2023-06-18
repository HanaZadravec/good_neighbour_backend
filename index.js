const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();

// Configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });

// Register CORS
app.use(cors());

// Configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure morgan
app.use(morgan("dev"));


// Bring in user routes
const userRoutes = require("./api/user/route/user");
app.use(userRoutes);

const crimeRoutes = require("./api/crime/route/crime");
app.use(crimeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
