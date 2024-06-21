const express = require("express");
const router = express.Router();

// Import Controller
const { login, signup } = require("../Controller/auth");
const { auth, isStudent, isAdmin } = require("../Middleware/Auth");
// Define API
router.post("/login", login);
router.post("/signup", signup);

//protected Route
// Testing Route
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected route for testing",
  });
});

router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected route for student",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected route for admin",
  });
});

// EXport Router
module.exports = router;
