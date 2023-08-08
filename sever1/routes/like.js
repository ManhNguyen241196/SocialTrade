import express from "express";
import Post from "../model/Post.js";

const router = express.Router();

//add like to post

router.post("/", async (req, res, next) => {
  try {
    const likePost = await Post.findOneAndUpdate(
      { _id: req.query.postId },
      { $push: { likes: req.body.userLike } }
    );
    return res.status(200).json(`Like thanh cong ${req.query.postId}`);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.post("/dislike", async (req, res, next) => {
  try {
    const FindPost = await Post.findById(req.query.postId);
    if (FindPost) {
      const arrayLikes = FindPost.likes;
      let result = arrayLikes.filter((word) => {
        return word.valueOf() !== req.body.userLike;
      });
      try {
        try {
          const UpdatePost = await Post.findByIdAndUpdate(req.query.postId, {
            likes: result,
          });
          return res
            .status(200)
            .json(
              `${req.body.userLike} dislike thanh cong ${req.query.postId}`
            );
        } catch (error) {
          return res.status(400).json(error.message);
        }
      } catch (error) {
        return res.status(400).json(error.message);
      }
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
export default router;
