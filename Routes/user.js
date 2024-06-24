const express = require("express");
const router = express.Router();
const User = require("../Model/userModel");

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

// router.get("/getEmail", auth, async (req, res) => {
//   try {
//     const id = req.user.id;
//     console.log("ID: ", id);
//     const user = await User.findById(id);

//     res.status(200).json({
//       success: true,
//       user: user,
//       message: "Welcome to the protected route for email",
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });

// EXport Router
module.exports = router;
