import express from "express";
import User from "../model/User.js";
const router = express.Router();
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
//JWT
import jwt from "jsonwebtoken";

var salt = bcrypt.genSaltSync(10);
dotenv.config();
router.post("/register", async (req, res, next) => {
  // check email exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).json("Email already exists. Please use another");
  }

  //hash password

  //buoc de tao doc mới trên database
  const hashPass = bcrypt.hashSync(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPass,
  });

  try {
    const saveUser = await user.save();
    return res.status(200).json(user._id);
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

router.post("/login", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json("Email or password is wrong");
  }
  //check pass
  const validPass = bcrypt.compareSync(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).json("invalid password");
  }
  //creat webtoken
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  return res.header("auth-token", token).status(200).json("login thanh cong");
});

export default router;
