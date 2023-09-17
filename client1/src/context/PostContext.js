import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [currentPost, setCurrentPost] = useState([]);

  const addPost = (newPost) => {
    setCurrentPost(newPost);
  };
  return (
    <PostContext.Provider value={{ addPost, currentPost }}>
      {children}
    </PostContext.Provider>
  );
};
