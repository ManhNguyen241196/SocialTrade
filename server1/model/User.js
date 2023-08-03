import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [6, "name phải tối thiểu 6 kí tự"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: { type: String, required: true },
});

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true, min: [6, "Too few eggs"] },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true, min: [6, "Too few eggs"] },
// });
userSchema.set("timestamps", true);

export default mongoose.model("User", userSchema);
