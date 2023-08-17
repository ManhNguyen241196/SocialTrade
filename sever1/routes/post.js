import express from "express";
import checkVerify from "./verifyToken.js";
import Post from "../model/Post.js";
import Profile from "../model/Profile.js";

const router = express.Router();

//id cura user ví dụ. Sau này chỗ này sẽ  là id user mà từ client gửi về
let userIdDummy = "64a14eef1e193f574e9c64e5";
let postIdDummy = "64b3e63cee91c72de02e43b8";

router.get("/", checkVerify, async (req, res, next) => {
  console.log(req.userId);
  userIdDummy = req.userId;
  try {
    // tìm tất cả các following của current user
    const fetchData = await Profile.find({ user: userIdDummy });
    let followers_CurrUser = fetchData[0].following;
    // Đưa array đó và current user vào 1 array mới
    let arrUserId = [...followers_CurrUser, userIdDummy];

    // tìm lặp lần lượt qua các user và gom chúng vào 1 array bằng array.map()
    const arrMap = await Promise.all(
      arrUserId.map(async (userId) => {
        try {
          let fetchPost = await Post.find({ user: userId });
          return fetchPost;
        } catch (error) {
          console.log(error.message);
        }
      })
    );

    return res.status(200).json({
      dataPost: {
        followers: arrMap,
        user: req.userId,
      },
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

//create new post
router.post("/", async (req, res, next) => {
  const posts = new Post({
    user: req.body.user,
    content: req.body.content,
    image: req.body.image,
  });

  if (posts) {
    posts
      .validate()
      .then(() => {
        console.log("post up co loi j ca");
        const savePost = posts.save();
        return res.status(200).json(posts._id);
      })
      .catch((err) => {
        return res.status(400).json(err.message);
      });
  }
});

//edit old post
router.put("/", async (req, res, next) => {
  const filter = { _id: req.query.postId };
  const updatePost = {
    content: req.body.content,
    image: req.body.image,
  };

  try {
    const getPost = await Post.findById(filter);
    let mess = null;

    if (getPost.user == req.body.user) {
      try {
        const doc = await Post.findOneAndUpdate(filter, updatePost, {
          returnOriginal: false,
        });
        return res.status(200).json("update thanh cong ");
      } catch (error) {
        return res.status(400).json(error.message);
      }
    } else {
      mess = " User KHÔNG có quyen edit  ";
      return res.status(200).json(mess);
    }
  } catch (error) {
    return res.status(400).json("KHÔNG TÌM ĐƯỢC BÀI POST");
  }
});

//delete post
router.delete("/", async (req, res, next) => {
  try {
    const deletePost = await Post.findByIdAndDelete(req.query.postId);
    return res.status(200).json("DELETE SUCCESSFULL POST");
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

//get post của cụ thể 1 user. Sau này userIdDummy sẽ được thay bằng userId get từ req.query ?userId = "64a14eef1e193f574e9c64e5"
router.get("/userId", async (req, res, next) => {
  try {
    const data = await Post.find({ user: req.query.id });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

export default router;
