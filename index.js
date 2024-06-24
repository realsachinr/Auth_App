const express = require("express");
const app = express();

// import Environment file
require("dotenv").config();

// import port
const PORT = process.env.PORT || 3002;

// Use parser 
app.use(express.json());

// Cookie-parser - what is this and why we need this?
const cookieparser =  require("cookie-parser");
app.use(cookieparser());

// Calling Database
require("./Config/database").connectDB();

// Import Route
const user = require("./Routes/user");

//mount the routes
app.use("/api/v1", user)

//Server listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.get("/", (req, res) => {
    res.send("Welcome to NodeJs API");
})