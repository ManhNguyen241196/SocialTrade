import "./leftbar.css";

// import { Users } from "../../dummyData";
// import CloseFriend from "../closeFriend/CloseFriend";
import { HomeFilled, MessageFilled } from "@ant-design/icons";

export default function LeftBar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <HomeFilled className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <MessageFilled className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {/* {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))} */}
        </ul>
      </div>
    </div>
  );
}
