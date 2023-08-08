// import "./Profile.css";
import Feed from "../../components/feed/Feed";
import { useParams } from "react-router-dom";
const postDummy = [
  {
    _id: "64cba5e971530706e913ece9",
    user: "64abed4ddddf66be855d6130",
    content: "anh  ny dep z",
    image: "1a8437c9-cfce-4ad1-899f-fdddb75ebe5f_post.jpeg",
    likes: ["64abed4ddddf66be855d6130"],
    comments: [],
    createdAt: "2023-08-03T13:04:41.426Z",
    __v: 0,
  },
];

const Profile = () => {
  let { userId } = useParams();

  return (
    <>
      <div>This is profile of {userId}</div>
      <Feed posts={postDummy} />
    </>
  );
};

export default Profile;
