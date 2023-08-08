import "./comment.css";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CommentShow = ({ comment }) => {
  async function fetchingAvata() {
    const res = await axios.get(
      "http://localhost:8800/api/profile?userID=" + comment.user
    );

    return res.data[0].imageAvata;
  }

  const { data } = useQuery(["avata", comment._id], fetchingAvata);

  return (
    <div className="comment">
      {data !== "" ? (
        <img src={data} alt="" />
      ) : (
        <img
          src="https://cdn3.vectorstock.com/i/1000x1000/32/12/default-avatar-profile-icon-vector-39013212.jpg"
          alt=""
        />
      )}
      <div className="info">
        <span>{comment.user}</span>
        <p>{comment.content}</p>
      </div>
      <span className="date">{moment(comment.createdAt).fromNow()}</span>
    </div>
  );
};

export default CommentShow;
