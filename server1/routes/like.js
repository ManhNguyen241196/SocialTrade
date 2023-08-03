import express from "express";

const router = express.Router();

router.post("/", async (req, res, next) => {
  console.log(`${req.body.userLike} click like`);
});

export default router;
