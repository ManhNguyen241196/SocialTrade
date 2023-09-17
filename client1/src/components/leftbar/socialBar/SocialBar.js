import { useState } from "react";
import "./socialBar.css";

import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Status", "status", null, [
    getItem("All Status", "1"),
    getItem("Followers Status", "2"),
  ]),
  getItem("Chat", "chat", null),
  getItem("Notification", "noti", null),
  getItem("Follow", "follow", null, [
    getItem("Followers", "3"),
    getItem("Following", "4"),
  ]),
];

export default function SocialBar() {
  const navigate = useNavigate();
  const [currentClick, setCurrentClick] = useState("2");
  const menuItems = {
    1: "/allPosts",
    2: "/",
    3: "/listFollower",
    4: "/listFollowing",
    noti: "/notification",
    chat: "/chat",
  };

  const onClick = (e) => {
    const menuItem = menuItems[e.key];
    if (menuItem) {
      navigate(menuItem);
      setCurrentClick(e.key);
    }
  };
  return (
    <div className="socialbar">
      <Menu
        onClick={onClick}
        style={{
          width: 300,
        }}
        defaultSelectedKeys={currentClick}
        defaultOpenKeys={["status"]}
        mode="inline"
        items={items}
      />
    </div>
  );
}
