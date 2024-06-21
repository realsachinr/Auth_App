const bcrypt = require("bcrypt");
const User = require("../Model/userModel");

//Signup route Handler
exports.signup = async (req, res) => {
  try {
    //get Data
    const { name, email, password, role } = req.body;

    //Check if user Already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    //Secure Password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in Hasing Password",
      });
    }

    // Create entry for user
    const user = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    const newUser = new User(user);

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      data: savedUser,
      message: "User Created Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
