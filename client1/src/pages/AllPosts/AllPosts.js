import axios from "axios";
import "./allPosts.css";
import { useContext, useState } from "react";
import Feed from "../../components/feed/Feed";

//react query
import { useQuery } from "@tanstack/react-query";
import CheckFunc from "../../components/CheckVerify";

import Share from "../../components/share/Share";
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";

const AllPosts = () => {
  const { currentUser, addUser } = useContext(UserContext);
  const { addPost, currentPost } = useContext(PostContext);

  const postQuery = useQuery({
    queryKey: ["AllPosts"],
    queryFn: async () => {
      let querydata = 1;
      const fetchData = async (objectHeaders) => {
        try {
          const response = await axios.get(
            "http://localhost:8800/api/post/all",
            {
              headers: objectHeaders,
            }
          );
          const DataAllPosts = await response.data;
          addUser(DataAllPosts.dataPost.user);
          addPost([...DataAllPosts.dataPost.followers]);
        } catch (error) {
          console.log(error);
          if (error.response.data === "Invalid token") {
            addUser(null);
          }
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

  return (
    <>
      {currentUser ? (
        <div className="home">
          <Share />
          <Feed posts={currentPost} />
        </div>
      ) : (
        <h1>chua co currentUSer</h1>
      )}
    </>
  );
};

export default AllPosts;
