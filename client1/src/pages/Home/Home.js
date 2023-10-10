import axios from "axios";
import "./Home.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CheckFunc from "../../components/CheckVerify";
import Feed from "../../components/feed/Feed";

// import Weather from "../../components/weatherApp/Weather";

//react query
import { useQuery } from "@tanstack/react-query";
import Share from "../../components/share/Share";
import { PostContext } from "../../context/PostContext";
import { SocketContext } from "../../context/SocketContext";

const Home = () => {
  const { currentUser, addUser } = useContext(UserContext);
  const { addPost, currentPost } = useContext(PostContext);
  const { socket, addSocket } = useContext(SocketContext);
  const navigate = useNavigate();

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      let querydata = 1;
      const fetchData = async (objectHeaders) => {
        try {
          const response = await axios.get("http://localhost:8800/api/post", {
            headers: objectHeaders,
          });
          const Mydata = await response.data;
          addUser(Mydata.dataPost.user);
          addPost([...Mydata.dataPost.followers]);
        } catch (error) {
          if (error.response.data === "Invalid token") {
            addUser(null);
          }
          console.log(error);
        }
      };
      CheckFunc(fetchData);
      return querydata;
    },
    refetchOnWindowFocus: true,
    enabled: true,
  });

  if (postQuery.isLoading) return <h1>Loading....</h1>;
  if (postQuery.isError) {
    addUser(null);
    return <h1>Error loading data!!!</h1>;
  }

  const handleLogout = () => {
    localStorage.clear();
    addUser(null);
    navigate("/login");
  };

  return (
    <>
      {currentUser ? (
        <div className="home">
          {/* <button onClick={handleLogout}>logout</button> <h2>{currentUser}</h2> */}
          <Share />
          <Feed posts={currentPost} />
        </div>
      ) : (
        <h1>chua co currentUSer</h1>
      )}
    </>
  );
};

export default Home;
