// import "./profile.css";
import Feed from "../../components/feed/Feed";
import { useParams } from "react-router-dom";
import InforUser from "./InforUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPostUser = async (userId) => {
  try {
    const res = await axios.get(
      "http://localhost:8800/api/post/userId?id=" + userId
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const Profile = () => {
  let { userId } = useParams();
  const { data, status } = useQuery(["post", userId], () =>
    fetchPostUser(userId)
  );

  return (
    <>
      <InforUser userId={userId} />
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && <Feed posts={data} />}
    </>
  );
};

export default Profile;
