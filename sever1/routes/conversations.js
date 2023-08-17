// collection conversation  với các method là tạo mới và get các method chỉ để cung cấp các array chứa các id của user tham gia cuojc hội thoại đó.
import express from "express";
import Conversation from "../model/Conversation.js";

const router = express.Router();

// create a Conversation
router.post("/", async (req, res) => {
  try {
    const newConversation = await new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    await newConversation.save();
    res.status(200).json("create conversation thanh cong ");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all conversations a currentUser
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/check", async (req, res) => {
  const reqArr = [req.body.senderId, req.body.receiverId];
  //test check diu kien post
  try {
    const conver = await Conversation.find({
      members: { $in: [req.body.senderId] },
    });

    if (conver) {
      const conversation = [...conver];
      const arrayMems = conversation.map((item) => {
        return item.members;
      });
      console.log(arrayMems);

      let indexConversation = null;

      const resultAll = arrayMems.map((arrayMem, index) => {
        const resultFinal = arrayMem.every((item) => {
          let result = reqArr.includes(item);
          return result === true;
        });
        if (resultFinal) {
          indexConversation = index;
          return index;
        }
      });

      if (indexConversation !== null) {
        res.status(200).json(conversation[indexConversation]._id);
      } else {
        res.status(200).json("Not exists");
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
