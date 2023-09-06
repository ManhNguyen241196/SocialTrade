import Search from "antd/es/transfer/search";
import "./chat.css";
import { Button, Input, Space } from "antd";
import Message from "../../../components/message/Message";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import ListConversation from "../../../components/listConvarsation/ListConversation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Chat = () => {
  const [dataUser, setDataUser] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [objCurrentConver, setObjCurrentConver] = useState(null);

  const { currentUser } = useContext(UserContext);

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

  const SendMessHandle = async () => {
    let formData = {
      conversationId: objCurrentConver.id,
      sender: currentUser,
      text: textMessage,
    };

    try {
      const res = await axios.post(
        "http://localhost:8800/api/message",
        formData
      );
      if (res) {
        setTextMessage("");
      }
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //click handle
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
                    {/* <li className="clearfix">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="avatar"
                    />
                    <div className="about">
                      <div className="name">Vincent Porter</div>
                      <div className="status">
                        <span>
                          {" "}
                          last message nay la cuoi cung kha dai message nay la
                          cuoi cung kha dai{" "}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="clearfix active">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      alt="avatar"
                    />
                    <div className="about">
                      <div className="name">Aiden Chavez</div>
                      <div className="status">
                        {" "}
                        <i className="fa fa-circle online" /> online{" "}
                      </div>
                    </div>
                  </li> */}
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

                    <Message objCurrentConver={objCurrentConver} />
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
