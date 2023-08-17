import { useState } from "react";
import "./socialBar.css";

import { Menu } from "antd";

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
    getItem(
      "Status",
      "all",
      null,
      [getItem("All Status", "1"), getItem("Followers Status", "2")],
      "group"
    ),
  ]),
  getItem(
    <a
      href="http://localhost:3000/chat"
      target="_blank"
      rel="noopener noreferrer"
    >
      Chat
    </a>,
    "chat",
    null
  ),
  getItem("Notification", "noti", null),
  getItem("Follow", "follow", null, [
    getItem(
      "Follow",
      "allFollow",
      null,
      [getItem("Followers", "3"), getItem("Following", "4")],
      "group"
    ),
  ]),
];

export default function SocialBar() {
  const [currentClick, setCurrentClick] = useState("2");
  const onClick = (e) => {
    console.log("click ", e.key);
    setCurrentClick(e.key);
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
