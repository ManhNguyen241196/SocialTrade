import { useContext, useEffect, useState } from "react";
import "../ListFollower/listFollower.css";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import CardProfile from "../../components/cardProfile/CardProfile";

const ListFollowing = () => {
  const [followingIds, setFollowingIds] = useState(null);
  const { currentUser } = useContext(UserContext);

  const fetchProfile = async (userId) => {
    try {
      const res = await axios.get(
        "http://localhost:8800/api/profile?userID=" + userId
      );
      if (res) {
        setFollowingIds(res.data[0].following);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch array following user
  useEffect(() => {
    fetchProfile(currentUser);
  }, [currentUser]);

  return (
    <div className="home">
      <div className="ListArea">
        {followingIds &&
          followingIds.map((followingId) => {
            return (
              <CardProfile
                key={followingId}
                followerId={followingId}
                state={1}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ListFollowing;
