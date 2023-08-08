import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import {
  BellFilled,
  SearchOutlined,
  UsergroupAddOutlined,
  WechatOutlined,
} from "@ant-design/icons";

export default function TopBar() {
  const { currentAvata, currentUser } = useContext(UserContext);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SociTrade</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchOutlined className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
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
          <div className="topbarIconItem">
            <WechatOutlined />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <BellFilled />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${currentUser}`}>
          <img src={currentAvata} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  );
}
