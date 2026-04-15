const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    exerciseName: {
      type: String,
      required: [true, "Exercise name is required"]
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"]
    },
    caloriesBurned: {
      type: Number,
      min: [0, "Calories cannot be negative"]
    },
    category: {
      type: String,
      enum: ["cardio", "strength", "flexibility", "other"],
      default: "other"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);