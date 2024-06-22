const bcrypt = require("bcrypt");
const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

//Login Route handler
exports.login = async (req, res) => {
  try {

    //data fetch
    const {email, password} = req.body;
    //validation on email and password
    if(!email || !password) {
        return res.status(400).json({
            success:false,
            message:'PLease fill all the details carefully',
        });
    }

    //check for registered user
    let user = await User.findOne({email});
    //if not a registered user
    if(!user) {
        return res.status(401).json({
            success:false,
            message:'User is not registered',
        });
    }

    const payload = {
        email:user.email,
        id:user._id,
        role:user.role,
    };
    //verify password & generate a JWT token
    if(await bcrypt.compare(password,user.password) ) {
        //password match
        let token =  jwt.sign(payload, 
                            process.env.JWT_SECRET,
                            {
                                expiresIn:"2h",
                            });

                            

        user = user.toObject();
        user.token = token;
        user.password =  undefined;

        const options = {
            expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly:true,
        }

        res.cookie("Token", token, options).status(200).json({
            success:true,
            token,
            user,
            message:'User Logged in successfully',
        });
    }
    else {
        //passwsord do not match
        return res.status(403).json({
            success:false,
            message:"Password Incorrect",
        });
    }

}catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
