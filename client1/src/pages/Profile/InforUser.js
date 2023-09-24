import axios from "axios";
import "./profile.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Modal, message } from "antd";
import ProfileEdit from "../../components/profile/ProfileEdit";
import { SocketContext } from "../../context/SocketContext";
import CreateNewNoti from "../../method/createNewNoti";

const InforUser = ({ userId }) => {
  const { currentUser, fetchAvata, currentName } = useContext(UserContext);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateSubmit, setStateSubmit] = useState(false);

  const [follow, setFollow] = useState(false);

  const { socket } = useContext(SocketContext);

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/userDetail?userID=" + userId
        );
        setName(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchName();
  }, [userId]);

  //get all data in profile user
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8800/api/profile?userID=" + userId
      );
      return res.data[0];
    } catch (error) {
      console.log(error);
    }
  };
  const { data, status } = useQuery(["profile", userId], fetchProfile);

  //Open modal update profile
  const showModal = () => {
    setIsModalOpen(true);
  };

  async function updateData(data) {
    try {
      const updatedData = data;
      const response = await axios.put(
        "http://localhost:8800/api/profile?userID=" + userId,
        updatedData
      );
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      console.log("Data successfully updated:", response.data);
      message.success("Update your profile thanh cong", 1, () => {
        setIsModalOpen(false);
        fetchAvata();
      });
    } catch (error) {
      console.error("An error occurred while updating data:", error.message);
    }
    setStateSubmit(false);
  }

  const handleOk = () => {
    setStateSubmit(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // xử lí follow
  //check xem user nay da duoc follow hay chua
  useEffect(() => {
    if (data) {
      console.log("array followers cua currrent user", data.followers);
      let checkId = data.followers.includes(currentUser);
      console.log(checkId);
      if (checkId) {
        setFollow(true);
      } else {
        setFollow(false);
      }
    }
  }, [data]);

  const addFollow = async () => {
    setFollow(true);
    try {
      const response = await axios.post(
        "http://localhost:8800/api/follow?userId=" + userId,
        { userFollow: currentUser }
      );

      if (response) {
        const res = CreateNewNoti("follow", currentUser, userId);
        if (socket) {
          socket.emit("getNotiClient", {
            currUser: currentUser,
            currUser_name: currentName,
            otherUser: userId,
            type: "follow",
          });
        }
        message.success(`Bạn đã follow thành công ${name}`, 1);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFollow = async () => {
    setFollow(false);
    try {
      const response = await axios.put(
        "http://localhost:8800/api/follow?userId=" + userId,
        { userFollow: currentUser }
      );
      const responseCurUSer = await axios.put(
        "http://localhost:8800/api/follow/curUser?userId=" + userId,
        { userFollow: currentUser }
      );
      message.success(`Bạn đã HỦY follow ${name}`, 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  // xử lí đoạn open page chat
  const OpenChatHandle = async () => {
    const formDataUser = {
      senderId: currentUser,
      receiverId: userId,
    };
    try {
      const response = await axios.post(
        "http://localhost:8800/api/conversation/check",
        formDataUser
      );
      if (response) {
        if (response.data === "Not exists") {
          const response = await axios.post(
            "http://localhost:8800/api/conversation",
            formDataUser
          );
          alert(response.data);
          window.open(
            "http://localhost:3000/chat",
            "example",
            "width=1500,height=700"
          );
        } else {
          window.open(
            "http://localhost:3000/chat",
            "example",
            "width=1500,height=700"
          );
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <>
          <div className="images">
            <img
              src={
                data.imageWall
                  ? data.imageWall
                  : "data:image/png;base64,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"
              }
              alt=""
              className="cover"
            />
            <img
              src={
                data.imageAvata
                  ? data.imageAvata
                  : "https://d2w9rnfcy7mm78.cloudfront.net/8040974/original_ff4f1f43d7b72cc31d2eb5b0827ff1ac.png?1595022778?bc=0"
              }
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <div class="linkSocial">
                  {/* <a href="http://facebook.com">
                    <i
                      class="fab fa-facebook-square"
                      style={{ color: "#2448d6" }}
                    ></i>
                  </a>
                  <a href="mailto:user1@gmail.com">
                    <i class="fas fa-envelope"></i>
                  </a>
                  <a href="https://twitter.com">
                    <i class="fab fa-twitter-square"></i>
                  </a> */}
                </div>

                <div className="info">
                  <div className="item">
                    <i class="fas fa-venus-mars fa-lg"></i>
                    <span> {data?.sex}</span>
                  </div>
                  <div className="item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>{data?.address}</span>
                  </div>
                  <div className="item">
                    <i class="fas fa-link"></i>
                    <a href={data?.website} target="_blank">
                      {data?.website}
                    </a>
                  </div>
                </div>
              </div>
              <div className="center">
                <span class="userName">{name}</span>
                <div class="BtnContact">
                  {userId !== currentUser ? (
                    <>
                      {follow ? (
                        <button onClick={removeFollow}>
                          {" "}
                          <i class="fas fa-user-friends"></i> Following
                        </button>
                      ) : (
                        <button onClick={addFollow}>
                          {" "}
                          <i class="fas fa-user-plus"></i> Follow
                        </button>
                      )}

                      <button onClick={OpenChatHandle}>Chat</button>
                    </>
                  ) : (
                    <button onClick={showModal}>
                      {" "}
                      <i class="fas fa-edit"></i> Update profile
                    </button>
                  )}
                </div>
              </div>
              <div className="right">
                <div class="inforActive">
                  <h2>{data?.followers.length}</h2>
                  <span> Followers</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div>This is profile of {userId}</div>

      <Modal
        title="Update profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
      >
        <ProfileEdit
          oldData={data}
          stateSubmit={stateSubmit}
          handleOk={updateData}
        />
      </Modal>
    </>
  );
};

export default InforUser;
