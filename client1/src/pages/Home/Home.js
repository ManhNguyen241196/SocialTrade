import axios from "axios";
import "./Home.css";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const { currentUser, addUser } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (objectHeaders) => {
      try {
        console.log("bat dau fetch");
        let res = await axios.get("http://localhost:8800/api/post", {
          headers: objectHeaders,
        });
        const userID = res.data.post.user;

        addUser(userID);
      } catch (err) {
        console.log(err);
        addUser(null);
      }
    };

    let token;
    if (JSON.parse(localStorage.getItem("token"))) {
      token = JSON.parse(localStorage.getItem("token"));
      fetchData({ authtoken: token });
    } else {
      token = JSON.parse(localStorage.getItem("tokeGoogle"));
      fetchData({ authtokenGoogle: token });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    addUser(null);
    navigate("/login");
  };

  return (
    <>
      {currentUser ? (
        <div className="home">
          <button onClick={handleLogout}>logout</button> <h2>{currentUser}</h2>
        </div>
      ) : (
        <h1>chua co currentUSer</h1>
      )}
    </>
  );
};

export default Home;
