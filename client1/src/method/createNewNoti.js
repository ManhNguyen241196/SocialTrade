import axios from "axios";

const createNewNoti = async (type, senderId, receiverId, postId) => {
  let data = {
    senderId: senderId,
    receiverId: receiverId,
    postId: postId,
  };
  try {
    let res = await axios.post(
      "http://localhost:8800/api/notification?notiType=" + type,
      data
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
export default createNewNoti;
