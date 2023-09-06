import express from "express";
import User from "../model/User.js";
const router = express.Router();
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import mongoose from "mongoose";
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

  if (user) {
    user
      .validate()
      .then(() => {
        console.log("k co loi j ca");
        const saveUser = user.save();
        return res.status(200).json({ id: user._id, name: user.name });
      })
      .catch((err) => {
        return res.status(400).json(err.message);
      });
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
  const token = jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 3600, data: { _id: user._id } },
    process.env.TOKEN_SECRET
  );

  return res
    .header("authtoken", token)
    .status(200)
    .json({ token: token, userId: user._id });
});

export default router;
