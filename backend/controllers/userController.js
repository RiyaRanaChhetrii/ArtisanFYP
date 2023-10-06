import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//desc    Auth user & got token
//route   POST /api/users/login
//access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }) //Find user from email
  
  if(user && (await user.matchPassword(password))) { // If user exist match password
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {         //If password doesnot match
    res.status(401)
    throw new Error('Invalid email or password')
  }

});

export { authUser }