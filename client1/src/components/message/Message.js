import { useContext, useState } from "react";
import "./message.css";

const Message = () => {
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

  function renderData(params) {
    const data_li = params.map((param) => {
      if (param.sender == DummyCurUser) {
        return (
          <li className="clearfix">
            <div className="message-data align-right">
              <span className="message-data-time">{param.createdAt}</span>{" "}
              &nbsp; &nbsp;
              <span className="message-data-name">{param.sender}</span>{" "}
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
              <span className="message-data-name">{param.sender}</span>
              <span className="message-data-time">{param.createdAt}</span>
            </div>
            <div className="message my-message">{param.text}</div>
          </li>
        );
      }
    });

    return <span>{data_li}</span>;
  }

  return (
    <div className="chat-history">
      <ul>{renderData(DummyDataMessage)}</ul>
    </div>
  );
};

export default Message;
