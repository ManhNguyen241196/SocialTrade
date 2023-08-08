import { useContext, useEffect, useState } from "react";
import "./post.css";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import Comments from "../comment/Comment.js";

export default function Post({ post }) {
  const { currentUser } = useContext(UserContext);

  const [userPost, setUserPost] = useState(null);
  const [imgPost, setImgPost] = useState(null);
  const [userAvata, setUserAvata] = useState(null);
  const [userName, setUserName] = useState(null);
  const [likeState, setLikeState] = useState(false);
  const [showCmt, setShowCmt] = useState(false);

  const [postDate, setPostDate] = useState("1 minute ago");

  const queryClient = useQueryClient();

  //refetch page
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  }, [likeState, postDate, userName, imgPost, userAvata]);

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

    const formatLike = () => {
      if (post.likes) {
        if (post.likes.includes(currentUser)) {
          setLikeState(true);
        }
      }
    };

    formatLike();
    fomartTime();
    if (post.image) {
      fetchImgPost();
    }
  }, [post]);

  //like/dislike area
  const fetchLikePost = async () => {
    let data = { userLike: currentUser };
    try {
      let res = await axios.post(
        "http://localhost:8800/api/like?postId=" + post._id,
        data
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDisLikePost = async () => {
    let data = { userLike: currentUser };
    try {
      let res = await axios.post(
        "http://localhost:8800/api/like/dislike?postId=" + post._id,
        data
      );
    } catch (err) {
      console.log(err);
    }
  };

  //like button
  const likeHandle = () => {
    setLikeState(true);
    fetchLikePost();
  };

  // disLike button
  const disLikeHandle = () => {
    setLikeState(false);
    fetchDisLikePost();
  };

  //show cmt
  const CommentHandle = () => {
    setShowCmt(!showCmt);
  };

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
              <i class="fas fa-thumbs-up " onClick={disLikeHandle}></i>
            ) : (
              <i class="far fa-thumbs-up" onClick={likeHandle}></i>
            )}
            <span className="postCommentText">
              {post?.likes.length} people like it
            </span>
          </div>

          <div className="postBottomMiddle" onClick={CommentHandle}>
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

      {showCmt && (
        <div>
          {" "}
          <Comments postId={post._id} />
        </div>
      )}
    </div>
  );
}
