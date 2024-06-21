const mongoose = require("mongoose");
require('dotenv').config();

exports.connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.error(error);
        console.log("Database connection failed");
        process.exit(1);
    })
}

