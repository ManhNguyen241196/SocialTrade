import express from "express";
import Comment from "../model/Comment.js";
import Post from "../model/Post.js";

const router = express.Router();

//id cura user ví dụ. Sau này chỗ này sẽ  là id user mà từ client gửi về
const userIdDummy = "64a14eef1e193f574e9c64e5";
const postIdDummy = "64b3e5636ae626c40a45d0be";

router.post("/", async (req, res, next) => {
  const comment = new Comment({
    user: req.body.user,
    post: req.body.post,
    content: req.body.content,
    image: req.body.image,
  });

  const AddCmtArray = async (id) => {
    const cmtPost = await Post.findOneAndUpdate(
      { _id: req.body.post },
      { $push: { comments: id } }
    );
  };

  if (comment) {
    comment
      .validate()
      .then(() => {
        console.log("post comment co loi j ca");
        const saveComment = comment.save();
        AddCmtArray(comment._id);
        return res.status(200).json(comment._id);
      })
      .catch((err) => {
        return res.status(400).json(err.message);
      });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const data = await Comment.find({ post: req.query.postId });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

export default router;
