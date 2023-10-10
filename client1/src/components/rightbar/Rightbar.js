import { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/UserContext";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CountMessContext } from "../../context/CountMess";
import { CountNotiContext } from "../../context/CountNotiContext";
import TradingView from "./components/page/Right/TradingView/TradingView";
import Market from "./components/page/Right/Market/Market";
import WatchList from "./components/page/Right/WatchList/WatchList";
export default function Rightbar({ user }) {
  const { socket, addSocket } = useContext(SocketContext);
  const { currentUser } = useContext(UserContext);

  const [differentData, setDifferentData] = useState(null);

  const [connectSocket, setConnectSocket] = useState(false);

  //add count newmess
  const { addCount } = useContext(CountMessContext);
  const { addCountNoti, addCountNoti_follow } = useContext(CountNotiContext);

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

  //send noti message
  const notify = () => toast(`noi dung notify`);

  useEffect(() => {
    if (socket) {
      console.log("nhan thong bao 1 lan");
      socket.on("sendMessageServer_notyfi", (dataMessSocket_notify) => {
        if (dataMessSocket_notify && dataMessSocket_notify !== differentData) {
          addCount(1);
          toast(
            <p>
              <b>{dataMessSocket_notify}</b> da gui cho ban 1 mess
            </p>
          );
          setDifferentData(dataMessSocket_notify);
        }
      });

      socket.on("sendNotiServer_notify", (dataNotiServer_notify) => {
        if (dataNotiServer_notify) {
          const { typeSend, senderUserName } = dataNotiServer_notify;

          if (typeSend !== "follow") {
            addCountNoti(1);
            toast(
              <p>
                <b>{senderUserName}</b> da <b>{typeSend}</b> bai viet cua ban
              </p>
            );
          } else {
            addCountNoti_follow(1);
            toast(
              <p>
                <b>{senderUserName}</b> da <b>{typeSend}</b> bai viet cua ban
              </p>
            );
          }
        }
      });
    }
  }, [socket]);
  //show noti khi co mess

  return (
    <div className="rightbar">
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        limit={8}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="rightbarWrapper container_body">
        {/* <HomeRightbar /> */}
        <TradingView />
        <Market />
        <WatchList />
      </div>
    </div>
  );
}
