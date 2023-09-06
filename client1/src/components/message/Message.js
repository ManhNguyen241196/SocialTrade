import { useContext, useEffect, useState } from "react";
import "./message.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import moment from "moment/moment";

const Message = ({ objCurrentConver }) => {
  const [dataMess, setDataMess] = useState();
  const { currentUser } = useContext(UserContext);

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

  // useEffect(() => {
  //   console.log(idCurrentConver);
  // });

  // fetch message cua 1 conversation cụ thể
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/message/" + objCurrentConver.id
        );
        setDataMess(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (objCurrentConver) {
      getMessage();
    }
  }, [objCurrentConver]);

  function renderData(params) {
    if (params) {
      const data_li = params.map((param) => {
        //check xem tin nhan do dk read chua

        if (param.sender === currentUser) {
          return (
            <li className="clearfix">
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
