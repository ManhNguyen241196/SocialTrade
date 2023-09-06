import { useContext, useEffect, useState } from "react";
import "./listFollower.css";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import CardProfile from "../../components/cardProfile/CardProfile";

const ListFollower = () => {
  const [followerIds, setFollowerIds] = useState(null);
  const { currentUser } = useContext(UserContext);

  const fetchProfile = async (userId) => {
    try {
      const res = await axios.get(
        "http://localhost:8800/api/profile?userID=" + userId
      );
      if (res) {
        setFollowerIds(res.data[0].followers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch array follower user
  useEffect(() => {
    fetchProfile(currentUser);
  }, [currentUser]);

  return (
    <div className="home">
      <div className="ListArea">
        {followerIds &&
          followerIds.map((followerId) => {
            return <CardProfile key={followerId} followerId={followerId} />;
          })}
        {/* {DummyData.map((followerId) => {
          return <CardProfile key={followerId} followerId={followerId} />;
        })} */}
      </div>
    </div>
  );
};

export default ListFollower;
