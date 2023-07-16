import express from "express";
import routerAuth from "./routes/auth.js";
import routerPost from "./routes/post.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const PORT = 8800;
dotenv.config();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
//connect to DB
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected! to DB"))
  .catch((err) =>
    console.error("Something went wrong when try connect to DB", err)
  );
// cac thiet dinh gan nhu coos ddijnh trong moi app
app.use(express.json()); // thiet dinh de co the gui data len va tu dong chuyen ve dang json de cos the truyen dk

app.use("/api/user", routerAuth);
app.use("/api/post", routerPost);

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is Successfully Running", PORT);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
