import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageAvata: {
    type: String,
    required: false,
  },
  imageWall: {
    type: String,
    required: false,
  },
  sex: {
    type: String,
    required: false,
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

profileSchema.set("timestamps", true);

export default mongoose.model("Profile", profileSchema);
