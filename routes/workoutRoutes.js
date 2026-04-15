const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const validateWorkout = require("../middleware/validateWorkout");
const validateObjectId = require("../middleware/validateObjectId");

const {
  getAllItems,
  createItem,
  updateItem,
  deleteItem
} = require("../controllers/workoutController");

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// Controller routes
router.get("/", getAllItems);                                         // GET /workouts
router.post("/", validateWorkout, createItem);                        // POST /workouts
router.put("/:id", validateObjectId, validateWorkout, updateItem);    // PUT /workouts/:id
router.delete("/:id", validateObjectId, deleteItem);                  // DELETE /workouts/:id

module.exports = router;