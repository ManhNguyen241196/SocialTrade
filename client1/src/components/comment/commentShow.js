import "./comment.css";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CommentShow = ({ comment }) => {
  const [userName, setUserName] = useState("");
  
  async function fetchingAvata() {
    const res = await axios.get(
      "http://localhost:8800/api/profile?userID=" + comment.user
    );

    return res.data[0].imageAvata;
  }

  const { data } = useQuery(["avata", comment._id], fetchingAvata);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8800/api/userDetail?userID=" + comment.user
        );
        if (result) {
          setUserName(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchName();
  }, [comment.user]);

  return (
    <div className="comment">
      <Link to={`/profile/${comment.user}`}>
        {data !== "" ? (
          <img src={data} alt="" />
        ) : (
          <img
            src="https://cdn3.vectorstock.com/i/1000x1000/32/12/default-avatar-profile-icon-vector-39013212.jpg"
            alt=""
          />
        )}
      </Link>

      <div className="info">
        <span>{userName}</span>
        <p>{comment.content}</p>
      </div>
      <span className="date">{moment(comment.createdAt).fromNow()}</span>
    </div>
  );
};

export default CommentShow;
