const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const { requireAuth } = require("../middleware/requireAuth");

// Get current logged-in user
router.get("/me", requireAuth, (req, res) => {
    res.json({
        message: "You are authenticated",
        user: req.user
    });
});

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;