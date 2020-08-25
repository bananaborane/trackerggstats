const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load env
dotenv.config({ path: "./config.env" });

const app = express();

// Dev logging

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Profile Routes

app.use("/api/v2/profile", require("./routes/profile"));

// Handle production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => {
    return res.sendFile(__dirname + "/public/index.html");
  });
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening in ${process.env.NODE_ENV} mode on port ${port}!`);
});
