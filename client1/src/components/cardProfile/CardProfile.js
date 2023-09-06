import axios from "axios";
import "./cardProfile.css";
import { Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CardProfile = ({ followerId, state }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/userDetail?userID=" + followerId
        );
        setName(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchName();
  }, [followerId]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8800/api/profile?userID=" + followerId
      );
      return res.data[0];
    } catch (error) {
      console.log(error);
    }
  };
  const { data, status } = useQuery(["profile", followerId], fetchProfile);

  const cardClickHandle = () => {
    navigate(`/profile/${followerId}`);
  };
  return (
    <>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <div className="cardProfile" onClick={cardClickHandle}>
          <img
            src={
              data.imageAvata
                ? data.imageAvata
                : "https://d2w9rnfcy7mm78.cloudfront.net/8040974/original_ff4f1f43d7b72cc31d2eb5b0827ff1ac.png?1595022778?bc=0"
            }
          />
          <div className="cardProfile_content">
            <div className="cardProfile_content_name">
              <p>{name}</p>
            </div>
            <div>
              <span className="cardProfile_content_gender">
                <i class="fas fa-venus-mars"></i>: {data.sex}
              </span>
              <span className="cardProfile_content_address">
                <i class="fas fa-map-marker-alt"></i>: {data.address}
              </span>
            </div>
            <div className="cardProfile_content_btn">
              {state === 1 && <Button type="primary"> Unfollow </Button>}
              <Button type="primary"> Block </Button>{" "}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardProfile;
