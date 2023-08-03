import { useEffect, useState } from "react";
import "./post.css";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Post({ post }) {
  const [userPost, setUserPost] = useState(null);
  const [imgPost, setImgPost] = useState(null);
  const [userAvata, setUserAvata] = useState(null);
  const [userName, setUserName] = useState(null);
  const [likeState, setLikeState] = useState(false);

  const [postDate, setPostDate] = useState("1 minute ago");

  useEffect(() => {
    const fetchAvata = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8800/api/profile?userID=" + post.user
        );
        setUserAvata(result.data[0].imageAvata);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAvata();
  }, [post.user]);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8800/api/userDetail?userID=" + post.user
        );
        if (result) {
          setUserName(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchName();
  }, [post.user]);

  useEffect(() => {
    const fetchImgPost = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8800/api/upload?name=" + post.image
        );
        setImgPost(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fomartTime = () => {
      let time = post.createdAt;
      let formattedTime = moment(time).fromNow();
      setPostDate(formattedTime);
    };
    fomartTime();
    if (post.image) {
      fetchImgPost();
    }
  }, [post]);

  //like button
  const likeHandle = async () => {
    setLikeState(!likeState);
  };
  useEffect(() => {
    const fetchLikePost = async () => {
      let data = { userLike: "64abed4ddddf66be855d6130" };
      try {
        let res = await axios.post("http://localhost:8800/api/like", data);
      } catch (err) {
        console.log(err);
      }
    };
    //  fetchLikePost()
  }, []);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={"/"}>
              <img className="postProfileImg" src={userAvata} alt="" />
            </Link>
            <span className="postUsername">{userName}</span>
            <span className="postDate">{postDate} </span>
          </div>
          <div className="postTopRight">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.content}</span>
          {imgPost && <img className="postImg" src={imgPost} alt="" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {likeState ? (
              <i class="fas fa-thumbs-up"></i>
            ) : (
              <i class="far fa-thumbs-up" onClick={likeHandle}></i>
            )}
            <span className="postCommentText">
              {post?.likes.length} people like it
            </span>
          </div>

          <div className="postBottomMiddle">
            <i class="far fa-comment"></i>
            <span className="postCommentText">
              {post?.comments.length} comments
            </span>
          </div>

          <div className="postBottomRight">
            <i class="far fa-bookmark"> </i>
            <span className="postCommentText">Mark</span>
          </div>
        </div>
      </div>
    </div>
  );
}
