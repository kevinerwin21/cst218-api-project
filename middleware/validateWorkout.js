function validateWorkout(req, res, next) {
  const { exerciseName, duration, caloriesBurned, category } = req.body;

  // Exercise Name
  if (!exerciseName || exerciseName.trim() === "") {
    return res.status(400).json({ error: "Name of exercise is required" });
  }

  // Duration
  if (duration == null) {
    return res.status(400).json({ error: "Duration is required" });
  }
  
  const parsedDuration = Number(duration);
  if (isNaN(parsedDuration) || parsedDuration < 1){
    return res.status(400).json({ error: "Duration must be greater than or equal to 1" });
  }

  // Calories Burned
  if (caloriesBurned != null && caloriesBurned < 0) {
    return res.status(400).json({ error: "Calories burned cannot be negative" });
  }

  // Category (optional but must be valid if provided)
  const validCategories = ["cardio", "strength", "flexibility", "other"];
  if (category && !validCategories.includes(category)) {
    return res.status(400).json({ error: `Category must be one of: ${validCategories.join(", ")}`});
  }

  next();
}

module.exports = validateWorkout;
