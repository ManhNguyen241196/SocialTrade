import express from "express";
import User from "../model/User.js";
import Profile from "../model/Profile.js";

const router = express.Router();

router.post("/all", async (req, res, next) => {
  try {
    const FindPost = await User.find({ name: { $regex: req.query.search } });
    if (FindPost) {
      let newArr = await Promise.all(
        FindPost.map(async (userItem) => {
          try {
            const resProfile = await Profile.find({
              user: userItem._id,
            });
            if (resProfile) {
              let obj;
              if (resProfile[0]) {
                obj = {
                  avataUrl: resProfile[0].imageAvata,
                  name: userItem.name,
                  id: userItem._id,
                };
              } else {
                obj = { name: userItem.name, id: userItem._id };
              }

              return obj;
            }
          } catch (error) {
            return res.status(400).json(error.message);
          }
        })
      );

      return res.status(200).json(newArr);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

export default router;
