import express from "express";
import User from "../model/User.js";

const router = express.Router();

//id cura user ví dụ. Sau này sẽ là id của currentUser được gửi về từ client sua khi xác thực
let userIdDummy = "64abed4ddddf66be855d6130";

// lay profile
router.get("/", async (req, res, next) => {
  userIdDummy = req.query.userID;
  try {
    const data = await User.findById(userIdDummy);
    if (data.length === 0) {
      return res.status(200).json("Can not find User");
    } else {
      return res.status(200).json(data.name);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

export default router;
