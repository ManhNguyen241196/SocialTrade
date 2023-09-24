import { useContext, useState } from "react";
import "./comment.css";
// import { AuthContext } from "../../context/authContext";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CommentShow from "./commentShow.js";
import { UserContext } from "../../context/UserContext";
import { SocketContext } from "../../context/SocketContext";

const Comments = ({ postUser, postId, fetchCmtNoti }) => {
  const [desc, setDesc] = useState("");
  const { currentUser, currentAvata, currentName } = useContext(UserContext);

  //socket IO
  const { socket } = useContext(SocketContext);
  const queryClient = useQueryClient();

  async function fetchingCmts() {
    const res = await axios.get(
      "http://localhost:8800/api/comment?postId=" + postId
    );
    return res.data;
  }
  const { data, error, isError, isLoading } = useQuery(
    ["comments", postId],
    fetchingCmts
  );
  if (isLoading) {
    return <span>Đang tải...</span>;
  }
  if (isError) {
    return <span>Have an errors: {error.message}</span>;
  }

  const handleClick = async (e) => {
    e.preventDefault();

    const dataFormCmt = {
      user: currentUser,
      post: postId,
      content: desc,
      image: "",
    };
    try {
      const res = await axios.post(
        "http://localhost:8800/api/comment",
        dataFormCmt
      );
      console.log("comment thanh cong vao post", postId);
      fetchCmtNoti("comment", currentUser, postUser, postId);

      //send to server socket IO
      if (res) {
        if (socket) {
          socket.emit("getNotiClient", {
            currUser: currentUser,
            currUser_name: currentName,
            otherUser: postUser,
            type: "comment",
          });
        }
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setDesc("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentAvata} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>

      {data.map((commentItem) => {
        return <CommentShow key={commentItem._id} comment={commentItem} />;
      })}
    </div>
  );
};

export default Comments;
