import express from "express";
import Profile from "../model/Profile.js";

const router = express.Router();

//add follower to profile
router.post("/", async (req, res, next) => {
  try {
    const followPost = await Profile.findOneAndUpdate(
      { user: req.query.userId },
      { $push: { followers: req.body.userFollow } }
    );
    const currentUserPost = await Profile.findOneAndUpdate(
      { user: req.body.userFollow },
      { $push: { following: req.query.userId } }
    );
    if (followPost && currentUserPost) {
      return res.status(200).json(`Follow thanh cong`);
    } else {
      return res.status(400).json("có lỗi trong quá trình add follow");
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

async function removeFollowMethod(res, tarUser, curUser, arrayFollow) {
  try {
    const FindProfile = await Profile.findOne({ user: tarUser });

    if (FindProfile) {
      const arrayFollowers = FindProfile[arrayFollow];
      let result = arrayFollowers.filter((word) => {
        return word.valueOf() !== curUser;
      });

      try {
        try {
          const UpdateProfile = await Profile.findOneAndUpdate(
            { user: tarUser },
            {
              [arrayFollow]: result,
            }
          );
          return res
            .status(200)
            .json(`${curUser} huy follow thanh cong ${tarUser}`);
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
}
// remove follower
router.put("/", async (req, res, next) => {
  removeFollowMethod(res, req.query.userId, req.body.userFollow, "followers");

  //   try {
  //     const FindProfile = await Profile.findOne({ user: req.query.userId });

  //     if (FindProfile) {
  //       const arrayFollowers = FindProfile.followers;
  //       let result = arrayFollowers.filter((word) => {
  //         return word.valueOf() !== req.body.userFollow;
  //       });

  //       try {
  //         try {
  //           const UpdateProfile = await Profile.findOneAndUpdate(
  //             { user: req.query.userId },
  //             {
  //               followers: result,
  //             }
  //           );
  //           return res
  //             .status(200)
  //             .json(
  //               `${req.body.userFollow} huy follow thanh cong ${req.query.userId}`
  //             );
  //         } catch (error) {
  //           return res.status(400).json(error.message);
  //         }
  //       } catch (error) {
  //         return res.status(400).json(error.message);
  //       }
  //     }
  //   } catch (error) {
  //     return res.status(400).json(error.message);
  //   }
});

router.put("/curUser", async (req, res, next) => {
  removeFollowMethod(res, req.body.userFollow, req.query.userId, "following");
});
export default router;
