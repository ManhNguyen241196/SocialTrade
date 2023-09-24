import { useContext, useEffect, useState } from "react";
import "./message.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import moment from "moment/moment";
import { SocketContext } from "../../context/SocketContext";

const Message = ({ objCurrentConver, newMessYou }) => {
  const [dataMess, setDataMess] = useState(null);
  const { currentUser } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const DummyConversationId = "64df41c24373b716a895272a";
  const DummyCurUser = "64abed4ddddf66be855d6130";
  const DummyDataMessage = [
    {
      sender: "64a14eef1e193f574e9c64e5",
      text: "text1",
      createdAt: "1 hour ago",
    },
    {
      sender: "64abed4ddddf66be855d6130",
      text: "text2",
      createdAt: "1 hour ago",
    },
    {
      sender: "64a14eef1e193f574e9c64e5",
      text: "text3",
      createdAt: " 30 minutes ago",
    },
    {
      sender: "64abed4ddddf66be855d6130",
      text: "text3 cua user",
      createdAt: "3 minutes ago",
    },
    {
      sender: "64abed4ddddf66be855d6130",
      text: "text3 cua user",
      createdAt: "3 minutes ago",
    },
    {
      sender: "64abed4ddddf66be855d6130",
      text: "text3 cua user ",
      createdAt: "3 minutes ago",
    },
    {
      sender: "64abed4ddddf66be855d6130",
      text: "text3 cua user",
      createdAt: "3 minutes ago",
    },
  ];

  // fetch message cua 1 conversation cụ thể
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/message/" + objCurrentConver.id
        );
        console.log("FETCH MESS");
        setDataMess((prev) => {
          return ([...prev] = [...response.data]);
        });
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (objCurrentConver) {
      getMessage();
    }
  }, [objCurrentConver]);

  ///Socket IO nhận mess từ server socket . Chỉ client nào được nhận từ socket thhi moi co the them arr đuoc
  const addMess = (newMess, arr) => {
    if (
      !arr.some((mess) => {
        return mess.createdAt === newMess.createdAt;
      })
    ) {
      if (newMess) {
        setDataMess((prev) => {
          return Array.from(new Set([...prev, newMess]));
        });
        console.log(newMess);
      }
    }
  };

  useEffect(() => {
    if (socket && dataMess) {
      console.log("dataMess truoc khi chay socket: ", dataMess);
      //get data tu socket IO
      socket.on("sendMessageServer", (dataMessSocket) => {
        console.log("dataMessSocket:  ", dataMessSocket);
        if (dataMess) {
          if (dataMessSocket) {
            addMess(dataMessSocket, dataMess);
          }
        }
      });
    }
  }, [socket && dataMess]);

  useEffect(() => {
    if (dataMess && newMessYou) {
      addMess(newMessYou, dataMess);
    }
  }, [newMessYou]);

  function renderData(params) {
    if (params) {
      const data_li = params.map((param) => {
        //check xem tin nhan do dk read chua

        if (param.sender === currentUser) {
          return (
            <li className="clearfix" key={param.createdAt}>
              <div className="message-data align-right">
                <span className="message-data-time">
                  {" "}
                  {moment(param.createdAt).fromNow(true)}
                </span>{" "}
                &nbsp; &nbsp;
                <span className="message-data-name">You</span>{" "}
              </div>
              <div className="message other-message float-right">
                {param.text}
              </div>
            </li>
          );
        } else {
          return (
            <li>
              <div className="message-data">
                <span className="message-data-name">
                  {objCurrentConver.otherUserName}
                </span>
                <span className="message-data-time">
                  {moment(param.createdAt).fromNow(true)}
                </span>
              </div>
              <div className="message my-message">{param.text}</div>
            </li>
          );
        }
      });
      return <span>{data_li}</span>;
    }
  }

  useEffect(() => {
    const chatHis = document.querySelector(".chat-history");
    if (chatHis) {
      chatHis.scrollTop = 15000;
    }
  }, [dataMess]);

  return (
    <div className="chat-history">
      {dataMess && <ul>{renderData(dataMess)}</ul>}
    </div>
  );
};

export default Message;
