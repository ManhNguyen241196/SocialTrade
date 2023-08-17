import axios from "axios";
import "./profile.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Modal, message } from "antd";
import ProfileEdit from "../../components/profile/ProfileEdit";

const InforUser = ({ userId }) => {
  const { currentUser, fetchAvata } = useContext(UserContext);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateSubmit, setStateSubmit] = useState(false);

  const [follow, setFollow] = useState(false);

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
      message.success(`Bạn đã follow thành công ${name}`, 1);
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
            <img src={data?.imageWall} alt="" className="cover" />
            <img src={data?.imageAvata} alt="" className="profilePic" />
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
