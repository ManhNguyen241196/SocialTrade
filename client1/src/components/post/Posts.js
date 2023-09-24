import { useContext, useEffect, useState } from "react";
import "./post.css";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import Comments from "../comment/Comment.js";
import MorePost from "../morePost/MorePost";
import CreateNewNoti from "../../method/createNewNoti";
import { SocketContext } from "../../context/SocketContext";

export default function Post({ post }) {
  const { currentUser, currentName } = useContext(UserContext);

  const [imgPost, setImgPost] = useState(null);
  const [userAvata, setUserAvata] = useState(null);
  const [userName, setUserName] = useState(null);
  const [likeState, setLikeState] = useState(false);
  const [showCmt, setShowCmt] = useState(false);

  const [postDate, setPostDate] = useState("1 minute ago");
  // State show more
  const [showMore, setShowMore] = useState(false);
  const [arrCor, setArrCor] = useState([]);

  const queryClient = useQueryClient();

  //socket IO
  const { socket } = useContext(SocketContext);

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
    if (post.user !== currentUser) {
      const res = CreateNewNoti("like", currentUser, post.user, post._id);

      //send socket tới
      if (res) {
        if (socket) {
          socket.emit("getNotiClient", {
            currUser: currentUser,
            currUser_name: currentName,
            otherUser: post.user,
            type: "like",
          });
        }
      }
    }
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

  //show more table 3 dots
  const moreTableShow = (e) => {
    setShowMore(!showMore);
    setArrCor([e.pageX - 100, e.pageY + 5]);
  };
  let mystyle = {
    top: arrCor[1],
    left: arrCor[0],
  };
  const mouseOverHandle = () => {
    setShowMore(false);
  };

  return (
    <div className="post" onMouseLeave={mouseOverHandle}>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post?.user}`}>
              <img
                className="postProfileImg"
                src={
                  userAvata
                    ? userAvata
                    : "https://d2w9rnfcy7mm78.cloudfront.net/8040974/original_ff4f1f43d7b72cc31d2eb5b0827ff1ac.png?1595022778?bc=0"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{userName}</span>
            <span className="postDate">{postDate} </span>
          </div>

          {/* xư lí phân 3 dots  */}
          {post?.user === currentUser && (
            <>
              <div className="postTopRight" onClick={moreTableShow}>
                <i className="fas fa-ellipsis-h"></i>
              </div>
              {showMore && (
                <div className="postTopRight_more" style={mystyle}>
                  <MorePost setShowMore={setShowMore} post={post} />
                </div>
              )}
            </>
          )}
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
          <Comments
            postUser={post.user}
            postId={post._id}
            fetchCmtNoti={CreateNewNoti}
          />
        </div>
      )}
    </div>
  );
}
