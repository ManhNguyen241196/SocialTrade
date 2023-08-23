import { useEffect, useState } from "react";
import "./listConversation.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ListConversation = ({ dataConver, setObjCurrentConver }) => {
  const [userName, setUserName] = useState("");
  const [lastMess, setLastMess] = useState("");
  const [isRead, setIsRead] = useState(true);
  const [click, setClick] = useState(true);

  // fetch name and avata
  async function fetchingAvata() {
    const res = await axios.get(
      "http://localhost:8800/api/profile?userID=" + dataConver.userConver
    );

    return res.data[0].imageAvata;
  }
  const { data } = useQuery(
    ["avataConversation", dataConver.idConver],
    fetchingAvata
  );

  useEffect(() => {
    const fetchName = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8800/api/userDetail?userID=" + dataConver.userConver
        );
        if (result) {
          setUserName(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataRead = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8800/api/message/messageShowmore/" +
            dataConver.idConver,
          { sortDate: Date.now(), limit: 1, sort: -1 }
        );
        setLastMess(response.data[0]);
        setIsRead(true);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchDataNotRead = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/message/lastMessage/${dataConver.idConver}?userId=${dataConver.userConver}`
        );
        if (response.data.length > 0) {
          setIsRead(false);
          setLastMess(response.data[0]);
        } else {
          fetchDataRead();
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchName();
    fetchDataNotRead();
  }, [dataConver, click]);

  //fetch all data isRead: true
  const ChangeStateMessage = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8800/api/message/changeState/${dataConver.idConver}?userId=${dataConver.userConver}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // click to choose conversation active
  function selectHandle(e) {
    // console.log(dataConver.idConver);
    setObjCurrentConver({
      id: dataConver.idConver,
      srcAvata: data,
      otherUserName: userName,
    });
    // set message true -> false
    ChangeStateMessage();

    setClick(!click);
  }

  return (
    <>
      <li className="clearfix coverLay" onClick={selectHandle}>
        <img src={data} alt="avatar" />
        <div className="about">
          <div className="name">{userName}</div>
          <div className="status">
            {lastMess && (
              <span className={!isRead && "notRead"}>{lastMess.text}</span>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default ListConversation;
