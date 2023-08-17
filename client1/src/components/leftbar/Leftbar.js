import { useState } from "react";
import "./leftbar.css";
// import { Users } from "../../dummyData";
// import CloseFriend from "../closeFriend/CloseFriend";
import { HomeFilled, MessageFilled } from "@ant-design/icons";
import { Menu } from "antd";
import SocialBar from "./socialBar/SocialBar";

// khia bao item cho menu
const items = [
  {
    label: "Social",
    key: "social",
    icon: <i class="fas fa-users"></i>,
  },
  {
    label: "News",
    key: "news",
    icon: <i class="fas fa-newspaper"></i>,
    // disabled: true,
  },
];

export default function LeftBar() {
  const [showNews, setShowNews] = useState(false); //2 view news or social
  const [current, setCurrent] = useState("social");
  const onClick = (e) => {
    if (e.key === "news") {
      setShowNews(true);
    }
    if (e.key === "social") {
      setShowNews(false);
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
        {showNews ? (
          <p>this news sex bao gom ca phan weatherApp</p>
        ) : (
          <SocialBar />
        )}
      </div>
    </div>
  );
}
