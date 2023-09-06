import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import {
  BellFilled,
  SearchOutlined,
  UsergroupAddOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import ListConversation from "../listConvarsation/ListConversation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SearchTop from "./searchTop.js/SearchTop";

export default function TopBar() {
  const { currentAvata, currentUser } = useContext(UserContext);
  const [objCurrentConver, setObjCurrentConver] = useState(null); // phục vụ cho hiển thị đoạn chat popup

  const [dataUser, setDataUser] = useState("");
  const [wordSearch, setWordSearch] = useState("");
  const [contentSearch, setContentSearch] = useState("");

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
        <Link to="/chat">Show more</Link>
      </span>
    </div>
  );

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
          <div className="topbarIconItem">
            <UsergroupAddOutlined />
            <span className="topbarIconBadge">1</span>
          </div>

          {/* popup MESSAGE */}
          <Popover content={content} title="Message" trigger="click">
            <div className="topbarIconItem">
              <WechatOutlined />
              <span className="topbarIconBadge">2</span>
            </div>
          </Popover>

          <div className="topbarIconItem">
            <BellFilled />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${currentUser}`}>
          <img
            src={
              currentAvata
                ? currentAvata
                : "https://d2w9rnfcy7mm78.cloudfront.net/8040974/original_ff4f1f43d7b72cc31d2eb5b0827ff1ac.png?1595022778?bc=0"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
