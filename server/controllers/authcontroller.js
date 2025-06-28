const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const  generateToken = require('../utils/generateToken');
require('dotenv').config();

exports.register = async (req,res)=>{
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({ message: "user already exists" });
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
              name,
              email,
              password: hashedPassword
            });
        const token = generateToken(user._id,user.role);
        res.status(201).json({message:"registraion success",token,user});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"});   
    }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "password is incorrect" });

    const token = generateToken(user._id,user.role);
    res.status(201).json({ message: "login successful",token,user});
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
}