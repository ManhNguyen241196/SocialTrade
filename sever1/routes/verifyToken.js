import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
dotenv.config();

const OAuth = new OAuth2Client(
  "802068907259-r3qgq0evk47f7n4bmpdqihqg0hubk83d.apps.googleusercontent.com",
  "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"
);
const checkVerify = (req, res, next) => {
  const tokenUP = req.header("authtoken");
  const tokenGG = req.header("authtokenGoogle");
  if (tokenUP) {
    return checkVerifyUserPass(req, res, next);
  } else if (tokenGG) {
    return checkVerifyGoogle(req, res, next);
  }
};

const checkVerifyUserPass = (req, res, next) => {
  const token = req.header("authtoken");
  if (!token) return res.status(401).json("access denied");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET); // xác thực bằng verify
    req.userId = verified.data._id;
    next();
  } catch (err) {
    res.status(400).json("Invalid token");
  }
};

const checkVerifyGoogle = async (req, res, next) => {
  const token = req.header("authtokenGoogle");
  try {
    const ticket = await OAuth.verifyIdToken({
      idToken: token,
      audience:
        "802068907259-r3qgq0evk47f7n4bmpdqihqg0hubk83d.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    if (payload) {
      req.userId = payload["sub"];
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

export default checkVerify;
