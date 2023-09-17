import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import {
  BellFilled,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import ListConversation from "../listConvarsation/ListConversation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SearchTop from "./searchTop.js/SearchTop";
import ListNoti from "../listNoti/ListNoti";

//module function noti
import fetchNoti from "../../method/createNoti";

export default function TopBar() {
  const { currentAvata, currentUser, addUser } = useContext(UserContext);
  const [objCurrentConver, setObjCurrentConver] = useState(null); // phục vụ cho hiển thị đoạn chat popup

  const [dataUser, setDataUser] = useState("");
  const [wordSearch, setWordSearch] = useState("");
  const [contentSearch, setContentSearch] = useState("");

  const [clickNoti, setClickNoti] = useState(false);
  const [clickNoti_notFollow, setClickNoti_notFollow] = useState(false);

  const [dataNoti, setDataNoti] = useState(null);

  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  //fetch data
  function RenderData(arrays) {
    const renderArr = arrays.map((item) => {
      const fillterUser = item.members.filter((id) => id !== currentUser);
      return { idConver: item._id, userConver: fillterUser[0] };
    });
    setDataUser(renderArr);
  }

  // chay ham nay khi fetch thanh cong data . Dufng query de co the goi lại dk

  //query de fetch data
  async function fetchingConver() {
    const res = await axios.get(
      "http://localhost:8800/api/conversation/" + currentUser
    );
    return res.data;
  }
  const { data } = useQuery(["avataConversation", currentUser], fetchingConver);

  useEffect(() => {
    if (data) {
      RenderData(data);
    }
  }, [data]);

  //content Message
  const content = (
    <div>
      <ul>
        {dataUser &&
          dataUser.map((item) => {
            return (
              <>
                <ListConversation
                  key={item.idConver}
                  dataConver={item}
                  setObjCurrentConver={setObjCurrentConver}
                />
              </>
            );
          })}
      </ul>
      <span className="showMore_link">
        <Link to="/notification">Show more</Link>
      </span>
    </div>
  );

  //------------------------------------------------------------------
  //fetch data noti not follow
  useEffect(() => {
    fetchNoti("all", "notFollow", currentUser, setDataNoti);
  }, [clickNoti]);

  const handleClickNoti = () => {
    setClickNoti(!clickNoti);
  };

  const ChangeCurData = (id) => {
    const found = dataNoti.find((element) => element._id === id);
    if (!found.isMark) {
      found.isMark = true;
    }
    setDataNoti([...dataNoti]);
    console.log("ChangeCurData", dataNoti);
  };
  //content Noti   //click bieu tuong bell sẽ load hiện toan bộ noti có dạng false -> chuyển trạng thái isMark thành true của toàn bộ
  const contentNoti = (
    <div>
      <ul className="container_noti">
        {dataNoti &&
          dataNoti.map((item) => {
            return (
              <ListNoti
                key={item._id}
                dataNoti={item}
                ChangeCurData={ChangeCurData}
              />
            );
          })}
      </ul>
      <span className="showMore_link">
        <Link to="/notification">Show more</Link>
      </span>
    </div>
  );

  //------------------------------------------------------------------
  //fetch data noti follow
  useEffect(() => {
    fetchNoti("all", "follow", currentUser, setDataNoti);
  }, [clickNoti_notFollow]);

  const handleClickNoti_notFollow = () => {
    setClickNoti_notFollow(!clickNoti_notFollow);
  };
  //content Noti_notFollow  click vao bieu tuong group để show ra
  const contentNoti_notFollow = contentNoti;
  //----------------------------------------------------------------

  //contentSearch
  useEffect(() => {
    setContentSearch(
      <div>
        <SearchTop word={wordSearch} />
      </div>
    );
  }, [wordSearch]);
  const handleChangeInput = (e) => {
    setWordSearch(e.target.value);
  };

  // content userImg
  const showPopover = () => {
    setVisible(!visible);
  };
  const handleLogout = () => {
    localStorage.clear();
    addUser(null);
    navigate("/login");
  };

  const contentUser = (
    <div className="moreBtn_container">
      <div className="moreBtn_option">
        <Link to={`/profile/${currentUser}`}>
          <UserOutlined /> &ensp; Profile
        </Link>
      </div>
      <div className="moreBtn_option" onClick={handleLogout}>
        {" "}
        <LogoutOutlined /> &ensp; Log out{" "}
      </div>
    </div>
  );

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SociTrade</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <Popover
          placement="bottomLeft"
          content={contentSearch}
          title="Result"
          trigger="click"
        >
          <div className="searchbar">
            <SearchOutlined className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
              value={wordSearch || ""}
              onChange={handleChangeInput}
            />
          </div>
        </Popover>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
        </div>
        <div className="topbarIcons">
          {/* popup NOTI FOLLOW */}
          <Popover
            content={contentNoti_notFollow}
            title="Noti follow"
            trigger="click"
          >
            <div className="topbarIconItem" onClick={handleClickNoti_notFollow}>
              <UsergroupAddOutlined />
              <span className="topbarIconBadge">1</span>
            </div>
          </Popover>
          {/* popup MESSAGE */}
          <Popover content={content} title="Message" trigger="click">
            <div className="topbarIconItem">
              <WechatOutlined />
              <span className="topbarIconBadge">2</span>
            </div>
          </Popover>
          {/* popup NOTI NOT FOLLOW */}
          <Popover content={contentNoti} title="Notification" trigger="click">
            <div className="topbarIconItem" onClick={handleClickNoti}>
              <BellFilled />
              <span className="topbarIconBadge">1</span>
            </div>
          </Popover>
        </div>

        <Popover
          onOpenChange={showPopover}
          open={visible}
          content={contentUser}
          trigger="click"
        >
          <img
            src={
              currentAvata
                ? currentAvata
                : "https://d2w9rnfcy7mm78.cloudfront.net/8040974/original_ff4f1f43d7b72cc31d2eb5b0827ff1ac.png?1595022778?bc=0"
            }
            alt=""
            className="topbarImg"
          />
        </Popover>
      </div>
    </div>
  );
}
