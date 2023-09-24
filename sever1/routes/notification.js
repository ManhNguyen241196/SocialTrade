// collection conversation  với các method là tạo mới và get các method chỉ để cung cấp các array chứa các id của user tham gia cuojc hội thoại đó.
import express from "express";
import Notification from "../model/Notification.js";

const router = express.Router();

// create a Notification
router.post("/", async (req, res) => {
  try {
    const newNotification = new Notification({
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      postId: req.body.postId,
      notificationType: req.query.notiType,
    });
    await newNotification.save();
    res.status(200).json("create notification thanh cong ");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//GET noti chung KHÔNG CÓ FOLLOW
router.get("/", async (req, res) => {
  let NOTIFICATION_TYPES = {
    FOLLOW: "follow",
  };

  //gioi han so ket qua fetch
  let limitResult = req.query.limit !== "all" ? req.query.limit : 0;

  try {
    let notificationFilters = { receiverId: req.query.curUser };

    if (req.query.typeNoti === "notFollow") {
      notificationFilters.notificationType = { $ne: NOTIFICATION_TYPES.FOLLOW };
    } else if (req.query.typeNoti === "follow") {
      notificationFilters.notificationType = NOTIFICATION_TYPES.FOLLOW;
    }

    // van cufng 1 link nhung trong truong hop load noti chưa được đọc
    if (req.query.isRead === "unread") {
      notificationFilters.isMark = false;
    }

    const AllNoti = await Notification.find(notificationFilters)
      .sort({ createdAt: -1 })
      .limit(limitResult);

    if (req.query.isRead) {
      res.status(200).json(AllNoti.length);
    } else {
      res.status(200).json(AllNoti);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/isRead", async (req, res) => {
  try {
    const trueIsRead = await Notification.findByIdAndUpdate(req.query.id, {
      $set: {
        isMark: true,
      },
    });
    res.status(200).json(`đánh dấu đã đọc ${req.query.id} thanh công`);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const fetchDelete = await Notification.findByIdAndDelete(req.query.id);
    res.status(200).json(`xoas thanh công noti`);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
