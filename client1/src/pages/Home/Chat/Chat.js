import Search from "antd/es/transfer/search";
import "./chat.css";
import { Button, Input, Space } from "antd";
import Message from "../../../components/message/Message";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import ListConversation from "../../../components/listConvarsation/ListConversation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SocketContext } from "../../../context/SocketContext";
const Chat = () => {
  const [dataUser, setDataUser] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [objCurrentConver, setObjCurrentConver] = useState(null);
  const [newMess, setNewMess] = useState(null);

  const { currentUser } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const onSearch = (value) => console.log(value);

  function RenderData(arrays) {
    const renderArr = arrays.map((item) => {
      const fillterUser = item.members.filter((id) => id !== currentUser);
      return { idConver: item._id, userConver: fillterUser[0] };
    });
    setDataUser(renderArr);
  }

  // chay ham nay khi fetch thanh cong data . Dufng query de co the goi lại dk

  //query de fetch data
  async function fetchingConver() {
    const res = await axios.get(
      "http://localhost:8800/api/conversation/" + currentUser
    );
    return res.data;
  }
  const { data } = useQuery(["avataConversation", currentUser], fetchingConver);

  useEffect(() => {
    if (data) {
      RenderData(data);
    }
  }, [data]);

  // Create new message
  const changeHandle = (e) => {
    setTextMessage(e.target.value);
  };

  //show thong bao
  const SendMessHandle = async () => {
    let formData = {
      conversationId: objCurrentConver.id,
      sender: currentUser,
      text: textMessage,
      reciever: objCurrentConver.otherUserName_Id,
      nameOtherUser: objCurrentConver.otherUserName,
    };

    try {
      const res = await axios.post(
        "http://localhost:8800/api/message",
        formData
      );

      if (res) {
        //------Socket IO ----------
        if (socket) {
          socket.emit("getMessageClient", formData);
        }
        setNewMess({
          ...formData,
          isRead: true,
          createdAt: Date.now(),
        });
        setTextMessage("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //click handle tạo hiệu ứng bôi đoạn hội thoại dk chọn
  const UlHandleClick = (e) => {
    const parent = e.target.parentElement;
    parent.childNodes.forEach((element) => {
      element.classList.remove("activeClick");
    });

    e.target.classList.add("activeClick");
  };

  return (
    <>
      <div className="container">
        <div className="row clearfix">
          <div className="card_area">
            <div className="card chat-app">
              <div id="plist" className="people-list">
                <div className="input-group">
                  <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                    style={{
                      width: 200,
                    }}
                  />
                </div>
                {dataUser && (
                  <ul
                    className="list-unstyled chat-list mt-2 mb-0"
                    onClick={UlHandleClick}
                  >
                    {dataUser.map((item) => {
                      return (
                        <>
                          <ListConversation
                            key={item.idConver}
                            dataConver={item}
                            setObjCurrentConver={setObjCurrentConver}
                          />
                        </>
                      );
                    })}
                  </ul>
                )}
              </div>
              {/* phan can chirnh sua lai định dạng  */}
              <div className="chat">
                {objCurrentConver ? (
                  <>
                    <div className="chat-header">
                      <img src={objCurrentConver.srcAvata} alt="avata" />
                      <span className="chat-user">
                        {objCurrentConver.otherUserName}
                      </span>
                    </div>

                    <Message
                      objCurrentConver={objCurrentConver}
                      newMessYou={newMess}
                    />

                    <div className="chat-message clearfix">
                      <Space direction="vertical" className="spaceInput">
                        <Space.Compact
                          style={{
                            width: "100%",
                          }}
                        >
                          <Input
                            placeholder="text in here"
                            value={textMessage}
                            onChange={changeHandle}
                          />
                          <Button type="primary" onClick={SendMessHandle}>
                            Send
                          </Button>
                        </Space.Compact>
                      </Space>
                    </div>
                  </>
                ) : (
                  <h2>Hãy tạo hoặc chọn cuộc hội thoại</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
