import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const checkVerify = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("access denied");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json("Invalid token");
  }
};
export default checkVerify;
