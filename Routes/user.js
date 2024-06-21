const express = require('express');
const router = express.Router();

// Import Controller
const {login, signup} = require('../Controller/auth')

// Define API 
// router.post("/login", login);
router.post("/signup", signup);

// EXport Router
module.exports = router;