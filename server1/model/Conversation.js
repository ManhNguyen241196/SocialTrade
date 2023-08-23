import mongoose from "mongoose"; // tạo schema cho các dòng hội thoại.

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);
const Conversation = mongoose.model("Conversation", ConversationSchema);
export default Conversation;
