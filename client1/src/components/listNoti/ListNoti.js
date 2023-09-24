import { useContext, useEffect, useState } from "react";
import "./listNoti.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";
import { EllipsisOutlined } from "@ant-design/icons";
import { Modal, Popover } from "antd";
import Post from "../post/Posts";
import { useNavigate } from "react-router-dom";
import { CountNotiContext } from "../../context/CountNotiContext";

const ListNoti = ({ dataNoti, ChangeCurData, DeleteCurData }) => {
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataPost, setDataPost] = useState(null);

  const { subtractionCountNoti, subtractionCountNoti_follow } =
    useContext(CountNotiContext);
  const navigate = useNavigate();
  //fetch profile User
  async function fetchingProfile() {
    const res = await axios.get(
      "http://localhost:8800/api/profile?userID=" + dataNoti.senderId
    );
    return res.data[0];
  }
  const { data } = useQuery(
    ["profileSender", dataNoti.senderId],
    fetchingProfile
  );

  const renderSwitch = (param) => {
    switch (param) {
      case "like":
      case "comment":
        return (
          <span>
            <b>{data.name}</b> đã {param} bài viết của bạn
          </span>
        );
      case "post":
        return (
          <span>
            <b>{data.name}</b> đã {param} một bài viết mới
          </span>
        );
      case "follow":
        return (
          <span>
            <b>{data.name}</b> đã {param} bạn
          </span>
        );
      default:
        return null;
    }
  };

  const showPopover = () => {
    setVisible(!visible);
  };

  const deleteHandle = async () => {
    try {
      const result = await axios.delete(
        "http://localhost:8800/api/notification/?id=" + dataNoti._id
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    DeleteCurData(dataNoti._id);
    setVisible(false);
  };

  const markHandle = async () => {
    try {
      const result = await axios.put(
        "http://localhost:8800/api/notification/isRead?id=" + dataNoti._id
      );
      console.log(result.data);
      if (dataNoti.notificationType === "follow") {
        subtractionCountNoti_follow(1);
      } else {
        subtractionCountNoti(1);
      }
    } catch (error) {
      console.log(error);
    }
    ChangeCurData(dataNoti._id);
    setVisible(false);
  };

  const content = (
    <div className="moreBtn_container">
      <div className="moreBtn_option" onClick={deleteHandle}>
        {" "}
        Delele{" "}
      </div>
      <div className="moreBtn_option" onClick={markHandle}>
        {" "}
        Mark readed{" "}
      </div>
    </div>
  );

  //show detail post
  const openModalHandle = () => {
    setIsModalOpen(true);
    fetchPost();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // fetch data cua post sau khi click vào noti đại diện cho nó:
  const fetchPost = async () => {
    if (dataNoti.postId) {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/post/userId/detail?postId=${dataNoti.postId}`
        );
        setDataPost(response.data[0]);
        markHandle();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      navigate(`/profile/${dataNoti.senderId}`);
    }
  };

  return (
    <>
      {data && (
        <div className={dataNoti.isMark ? "row_noti isRead" : "row_noti"}>
          <li className="clearfix coverLay_noti" onClick={openModalHandle}>
            <img
              src={
                data.imageAvata
                  ? data.imageAvata
                  : "https://d2w9rnfcy7mm78.cloudfront.net/8040974/original_ff4f1f43d7b72cc31d2eb5b0827ff1ac.png?1595022778?bc=0"
              }
              alt="avatar"
            />
            <div className="about">
              <div className="notiContent">
                {renderSwitch(dataNoti.notificationType)}
              </div>
              <div className="dateNoti">
                <span className="dateNoti_content">
                  {moment(dataNoti.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </li>
          <span className="moreBtn">
            <Popover
              onOpenChange={showPopover}
              open={visible}
              content={content}
              trigger="click"
              placement="rightBottom"
            >
              <EllipsisOutlined />
            </Popover>
          </span>

          <Modal
            title="Detail Post"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <div>{dataPost && <Post key={dataPost._id} post={dataPost} />}</div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ListNoti;
