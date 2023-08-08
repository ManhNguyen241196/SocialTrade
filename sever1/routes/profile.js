import express from "express";
import Profile from "../model/Profile.js";

const router = express.Router();

//id cura user ví dụ. Sau này sẽ là id của currentUser được gửi về từ client sua khi xác thực
let userIdDummy = "64abed4ddddf66be855d6130";
//id cura user ví dụ. Sau này chỗ này sẽ  là id user được lấy từ req.query từ website có dạng https://http://localhost:3000/profile?id=64a14eef1e193f574e9c64e5
// const userIdOtherUser = "64a58569ab17c23ef182c63a";
let userIdOtherUser = "64abed4ddddf66be855d6130";

// lay profile
router.get("/", async (req, res, next) => {
  userIdDummy = req.query.userID;
  try {
    const data = await Profile.find({ user: userIdDummy });
    if (data.length === 0) {
      return res.status(200).json("User no profile");
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

//add new profile
router.post("/", async (req, res, next) => {
  const profile = new Profile({
    user: userIdDummy,
    imageAvata: req.body.imageAvata,
    imageWall: req.body.imageWall,
    sex: req.body.sex,
    website: req.body.website,
    address: req.body.address,
    bio: req.body.bio,
  });

  if (profile) {
    profile
      .validate()
      .then(() => {
        console.log("post up co loi j ca");
        const saveProfile = profile.save();
        return res.status(200).json(profile._id);
      })
      .catch((err) => {
        return res.status(400).json(err.message);
      });
  }
});

//edit profile
router.put("/", async (req, res, next) => {
  if (userIdOtherUser === userIdDummy) {
    const updateProfile = {
      imageAvata: req.body.imageAvata,
      imageWall: req.body.imageWall,
      sex: req.body.sex,
      website: req.body.website,
      address: req.body.address,
      bio: req.body.bio,
    };

    try {
      const doc = await Profile.findOneAndUpdate(
        { user: userIdDummy },
        updateProfile,
        {
          returnOriginal: false,
        }
      );
      return res.status(200).json("update profile thanh cong ");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  } else {
    return res.status(400).json("bạn chỉ có thể edit profile của CHÍNH MÌNH");
  }
});

export default router;
