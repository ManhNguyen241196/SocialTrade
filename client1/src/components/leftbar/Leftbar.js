import { useState } from "react";
import "./leftbar.css";

import { Menu } from "antd";
import SocialBar from "./socialBar/SocialBar";
import { useNavigate } from "react-router-dom";
import Weather from "../weatherApp/Weather";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { CountNotiContext } from "../../context/CountNotiContext";

// khia bao item cho menu
const items = [
  {
    label: "Social",
    key: "social",
    icon: <i className="fas fa-users"></i>,
  },
  {
    label: "News",
    key: "news",
    icon: <i className="fas fa-newspaper"></i>,
    // disabled: true,
  },
];

export default function LeftBar() {
  const navigate = useNavigate();

  const [showNews, setShowNews] = useState(false); //2 view news or social
  const [current, setCurrent] = useState("social");
  const onClick = (e) => {
    if (e.key === "news") {
      setShowNews(true);
      navigate("/news");
    }
    if (e.key === "social") {
      setShowNews(false);
      navigate("/");
    }
    setCurrent(e.key);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {/* ------------------------- phan moi */}
        <Menu
          onClick={onClick}
          style={{
            width: 250,
            fontSize: 16,
            fontWeight: 500,
            display: "flex",
          }}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <div className="sidebarContent"></div>
        {showNews ? <Weather /> : <SocialBar />}
      </div>
    </div>
  );
}
