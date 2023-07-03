import express from "express";
import checkVerify from "./verifyToken.js";
const router = express.Router();

router.get("/", checkVerify, async (req, res, next) => {
  return res.status(200).json({
    post: {
      title: "title post",
      des: "somthingg des of post",
      user: req.user,
    },
  });
});

export default router;
