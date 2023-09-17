import { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/UserContext";
import { io } from "socket.io-client";
export default function Rightbar({ user }) {
  const { socket, addSocket } = useContext(SocketContext);
  const { currentUser } = useContext(UserContext);

  // const [socket, setSocket] = useState(null);
  const [connectSocket, setConnectSocket] = useState(false);

  /// socket IO
  useEffect(() => {
    if (!connectSocket) {
      addSocket(io("http://localhost:7000"));
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket) {
      setConnectSocket(socket.connected);
      // if (connectSocket) {
      socket.emit("addUser", currentUser);
      // }
    }
  }, [socket, currentUser]);

  // console.log("socket in ra rightbar la:  ", socket);

  const testIo = () => {
    if (socket) {
      socket.on("sendId", (arg1) => {
        console.log("useronline là:   ", arg1);
      });
    }
  };

  const clickTestIo = () => {
    socket.emit("clickTest", { name: currentUser });
  };
  //----------------------

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <li>user1 online</li>
          <li>user2 online</li>
          <li>user3 online</li>
        </ul>
      </>
    );
  };

  return (
    <div className="rightbar">
      <button className="clickBtnTest" onClick={clickTestIo}>
        {" "}
        Click test IO{" "}
      </button>
      {testIo()}
      <div className="rightbarWrapper">
        <HomeRightbar />
      </div>
    </div>
  );
}
