import Search from "antd/es/transfer/search";
import "./chat.css";
import { Button, Input, Space } from "antd";
import Message from "../../../components/message/Message";

const Chat = () => {
  const onSearch = (value) => console.log(value);

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
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  <li className="clearfix">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="avatar"
                    />
                    <div className="about">
                      <div className="name">Vincent Porter</div>
                      <div className="status">
                        {" "}
                        <i className="fa fa-circle offline" /> left 7 mins ago{" "}
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
                  </li>
                </ul>
              </div>
              {/* phan can chirnh sua lai định dạng  */}
              <div className="chat">
                <Message />

                <div className="chat-message clearfix">
                  <Space direction="vertical" className="spaceInput">
                    <Space.Compact
                      style={{
                        width: "100%",
                      }}
                    >
                      <Input defaultValue="Combine input and button" />
                      <Button type="primary">Send</Button>
                    </Space.Compact>
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
