import express from "express";
import Comment from "../model/Comment.js";

const router = express.Router();

//id cura user ví dụ. Sau này chỗ này sẽ  là id user mà từ client gửi về
const userIdDummy = "64a14eef1e193f574e9c64e5";
const postIdDummy = "64b3e63cee91c72de02e43b8";

router.post("/", async (req, res, next) => {
  const comment = new Comment({
    user: userIdDummy,
    post: postIdDummy,
    content: req.body.content,
    image: req.body.image,
  });

  if (comment) {
    comment
      .validate()
      .then(() => {
        console.log("post comment co loi j ca");
        const saveComment = comment.save();
        return res.status(200).json(comment._id);
      })
      .catch((err) => {
        return res.status(400).json(err.message);
      });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const data = await Comment.find({ post: postIdDummy });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

export default router;
