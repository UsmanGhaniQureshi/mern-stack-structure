const path = require("path");
const express = require("express");
const { connectToDB } = require("./helpers/db");
const port = process.env.PORT || 5000;

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (_, res) => {
    res.status(200).json({ message: "Welcome to the Support Desk API" });
  });
}

app.listen(port, () => console.log(`Server Started at the port ${port}`));
