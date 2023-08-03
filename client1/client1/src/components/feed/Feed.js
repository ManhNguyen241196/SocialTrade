import "./feed.css";
import Post from "../post/Posts";

const Feed = ({ posts }) => {
  let newArrPosts;
  if (posts) {
    newArrPosts = [].concat(...posts);
  }

  if (!posts) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        {newArrPosts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
