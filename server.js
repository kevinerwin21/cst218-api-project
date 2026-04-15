/**
 * Project: Workout App
 * Author: Kevin Erwin
 * ----------------------------------------
 * Connects to MongoDB
 * Configures Middleware
 * Loads workout routes
 * Starts Express
 */

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();             // Load environment variables from .env

const workoutRoutes = require("./routes/workoutRoutes");
const authRoutes = require("./routes/authRoutes");
const logger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());               // Middleware to read JSON from requests
app.use(logger);                       // logger middleware

/*Request counter (simple logging middleware)
let requestCount = 0;
app.use((req, res, next) => {
  requestCount++;
  console.log("Total requests so far:", requestCount);
  next();
})*/

// Root route
app.get("/", (req, res) => {
  res.send("My CST 218 project server is running. All systems go!");
});

app.get("/about", (req, res) => {
  res.send("This is a workout tracker log created for CST 218 project by Kevin Erwin.");
});

// Route groups
app.use("/workouts", workoutRoutes);
app.use("/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Database & Server Start
// Connect to MongoDB (Local or Atlas connection)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => { console.log("Connected to MongoDB");

  // Start server
    app.listen(PORT, () => {
      console.log("Server listening on port " + PORT);
    });
  }) 
  .catch((err) => { console.error("MongoDB connection error:", err);
  process.exit(1); // stop server if DB connection fails
});