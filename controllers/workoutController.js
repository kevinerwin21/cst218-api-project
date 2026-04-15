const Workout = require("../models/Workout");
const mongoose = require("mongoose");

// Get all workouts for the logged-in user
async function getAllItems(req, res) {
  try {
    console.log("Fetching workouts for user:", req.user.userId);

    const items = await Workout.find({ userId: req.user.userId });

    return res.status(200).json({
      message: "Items retrieved",
      data: items,
    });
  } catch (err) {
    console.error("WORKOUT GET ALL ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}

// Create a new workout
async function createItem(req, res) {
  try {
    const { exerciseName, duration, caloriesBurned, category } = req.body;

    const workout = await Workout.create({
      userId: req.user.userId, // ✅ use middleware userId
      exerciseName,
      duration,
      caloriesBurned,
      category,
    });

    return res.status(201).json({
      message: "Workout created",
      data: workout,
    });
  } catch (err) {
    console.error("WORKOUT CREATE ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}

// Update a workout by ID
async function updateItem(req, res) {
  try {
    const { id } = req.params;
    
    const allowedFields = ["exerciseName", "duration", "caloriesBurned", "category"];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No valid fields provided to update" });
    }

    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: id, userId: req.user.userId }, // ✅ ensure user owns workout
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ error: "Workout not found or you do not have permission" });
    }

    return res.status(200).json({
      message: "Workout updated",
      data: updatedWorkout,
    });
  } catch (err) {
    console.error("WORKOUT UPDATE ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}

// Delete a workout by ID
async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    
    const deletedWorkout = await Workout.findOneAndDelete({
      _id: id,
      userId: req.user.userId, // ✅ ensure user owns workout
    });

    if (!deletedWorkout) {
      return res.status(404).json({ error: "Workout not found or you do not have permission" });
    }

    return res.status(200).json({
      message: "Workout deleted",
      data: deletedWorkout,
    });
  } catch (err) {
    console.error("WORKOUT DELETE ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
};