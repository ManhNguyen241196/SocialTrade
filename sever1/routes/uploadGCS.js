import express from "express";
import { Storage } from "@google-cloud/storage";
import Multer from "multer";
const router = express.Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});

let projectId = "socitrade"; // Get this from Google Cloud
let keyFilename = "socitrade-26b10f1f8d29.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("postssocialtrade"); // Get this from Google Cloud -> Storage

router.get("/", async (req, res) => {
  let nameImg = req.query.name;
  const options = {
    matchGlob: nameImg,
  };

  try {
    const [files] = await bucket.getFiles(options);
    res
      .status(200)
      .json(
        `https://storage.googleapis.com/${files[0].metadata.bucket}/${files[0].metadata.name}`
      );
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", multer.single("imgfile"), (req, res) => {
  console.log("Made it /upload");
  try {
    if (req.file) {
      console.log("File found, trying to upload...");
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send("Success");
        console.log("Success");
        console.log(req.file);
      });
      blobStream.end(req.file.buffer);
    } else throw "error with img";
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/", async (req, res) => {
  const objectName = req.body.img;

  try {
    const deleteFile = await bucket.file(objectName).delete();
    console.log(`Object ${objectName} deleted successfully.`);
    res.status(200).json("delete thanh cong");
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
