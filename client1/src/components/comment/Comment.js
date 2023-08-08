import { useContext, useState } from "react";
import "./comment.css";
// import { AuthContext } from "../../context/authContext";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
import moment from "moment";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CommentShow from "./commentShow.js";
import { UserContext } from "../../context/UserContext";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(UserContext);
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

  const dataDummy = [
    {
      _id: "64b6b538acbeddc69209a4ba",
      post: "64b3e63cee91c72de02e43b8",
      user: "64a14eef1e193f574e9c64e5",
      content:
        "Điều đó có nghĩa là: mục đích useEffect để quản lý vòng đời của của một component và nó phục vụ chúng ta sử dụng trong function component thay vì các lifecycle như trước đây trong class component      Lifecycle method trong class component thực sự rất quan trọng, đôi khi chúng ta muốn fetch dữ liệu từ API khi rendering 1 component, đôi khi chúng ta muốn thực hiện những action cụ thể khi component update,... 2 Methods được cho là quan trọng nhất chính là componentDidMount và componentDidUpdate.",
      image:
        "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg",
      createdAt: "2023-07-18T15:52:24.645Z",
      updatedAt: "2023-07-18T15:52:24.645Z",
      __v: 0,
    },
    {
      _id: "32b6b538acbeddc2345322acdb",
      post: "64b3e63cee91c72de02e43b8",
      user: "64a14eef1e193f573e45r67yt34",
      content: "cmt2",
      image:
        "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-red-no-icon-image_1136655.jpg",
      createdAt: "2023-06-18T15:52:24.645Z",
      updatedAt: "2023-07-18T15:52:24.645Z",
      __v: 0,
    },
  ];

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
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setDesc("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img
          src="https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-link-chain-url-connection-link-abstract-circle-background-fl-png-image_1985250.jpg"
          alt=""
        />
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
