const User = require("../models/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// ================= REGISTER =================

exports.registerUser = async(req,res)=>{

  try{

    const { name,email,password,role } = req.body;

    const existing = await User.findOne({ email });

    if(existing){

      return res.status(400).json({
        message:"User already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password,10);

    const user = new User({

      name,
      email,
      password: hashedPassword,
      role,
      approved: role==="company" ? false : true

    });

    await user.save();

    res.json({
      message:"Registered successfully"
    });

  } catch(err){

    res.status(500).json({
      error: err.message
    });

  }

};

// ================= LOGIN =================

exports.loginUser = async(req,res)=>{

  try{

    const { email,password,role } = req.body;

    const user = await User.findOne({ email });

    if(!user){

      return res.status(400).json({
        message:"Invalid email or password"
      });

    }

    if(user.role !== role){

      return res.status(400).json({
        message:"Wrong role selected"
      });

    }

    const match =
      await bcrypt.compare(password,user.password);

    if(!match){

      return res.status(400).json({
        message:"Invalid email or password"
      });

    }

    if(user.role==="company" && !user.approved){

      return res.status(403).json({
        message:"Company not approved by admin"
      });

    }

    const token = jwt.sign({

      id:user._id,
      role:user.role

    },

    "SECRETKEY",

    {
      expiresIn:"7d"
    });

    res.json({

      message:"Login successful",

      token,

      user:{

        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role

      }

    });

  } catch(err){

    res.status(500).json({
      error: err.message
    });

  }

};