const User = require("../models/User");
const bcrypt = require("bcrypt");


// REGISTER
exports.registerUser = async (req, res) => {

  try {

    console.log("REGISTER DATA:", req.body); // debug

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {

      return res.status(400).json({
        message: "All fields required"
      });

    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({

      name,
      email,
      password: hashedPassword,
      role

    });

    await newUser.save();

    res.status(201).json({
      message: "Registered successfully"
    });

  } catch (error) {

    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

};



// LOGIN
exports.loginUser = async (req, res) => {

  try {

    console.log("LOGIN DATA:", req.body); // debug

    const { email, password, role } = req.body;

    if (!email || !password || !role) {

      return res.status(400).json({
        message: "All fields required"
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }

    if (user.role !== role) {

      return res.status(400).json({
        message: "Wrong role"
      });

    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {

      return res.status(400).json({
        message: "Wrong password"
      });

    }

    res.json({
      message: "Login successful",
      role: user.role
    });

  } catch (error) {

    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

};