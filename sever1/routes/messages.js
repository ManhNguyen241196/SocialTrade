import express from "express";
import Message from "../model/Message.js";
const router = express.Router();

// create a newMessage
router.post("/", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(200).json("create a message thanh cong ");
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all Message in a conversation
router.get("/:conversationId", async (req, res) => {
  try {
    const allMessage = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(allMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get 2 Message latest
router.get("/lastMessage/:conversationId", async (req, res) => {
  try {
    // const TwoMessage = await Message.find({
    //   conversationId: req.params.conversationId,
    // })
    //   .sort({ createdAt: -1 }) //sort từ mới tới cũ [ mới nhất ,...cux1,...cũ2]
    //   .limit(2);

    const trueIsRead = await Message.find({
      conversationId: req.params.conversationId,
      isRead: true,
      sender: req.query.userId,
    }).sort({ createdAt: -1 }); //sort từ cu tới moi [ cux nhất ,...moi1,...moiNhat]

    res.status(200).json(trueIsRead);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get 2 Message with date > x
router.post("/messageShowmore/:conversationId", async (req, res) => {
  const filter = req.body.sortDate;
  try {
    // req.query.createAt  sẽ được gửi cùng link.
    const ShowMore = await Message.find({
      conversationId: req.params.conversationId,
      createdAt: { $lte: filter },
    })
      .sort({ createdAt: req.body.sort }) //sort từ cu tới moi [ cux nhất ,...moi1,...moiNhat]
      .limit(req.body.limit);

    res.status(200).json(ShowMore);
  } catch (error) {
    res.status(500).json(error);
  }
});

//put message state isRead true -> false
router.put("/changeState/:conversationId", async (req, res) => {
  try {
    const trueIsRead = await Message.updateMany(
      {
        conversationId: req.params.conversationId,
        isRead: true,
        sender: req.query.userId,
      },
      {
        $set: {
          isRead: false,
        },
      }
    );
    res.status(200).json(trueIsRead.modifiedCount);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
