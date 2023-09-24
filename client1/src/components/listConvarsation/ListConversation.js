import { useContext, useEffect, useState } from "react";
import "./listConversation.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CountMessContext } from "../../context/CountMess";

const ListConversation = ({ dataConver, setObjCurrentConver }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastMess, setLastMess] = useState("");
  const [isRead, setIsRead] = useState(true);
  const [click, setClick] = useState(true);

  const { subtractionCount } = useContext(CountMessContext);

  // fetch name and avata
  async function fetchingProfile() {
    setIsLoading(true);
    const res = await axios.get(
      "http://localhost:8800/api/profile?userID=" + dataConver.userConver
    );
    setIsLoading(false);
    return res.data[0];
  }
  const { data } = useQuery(
    ["userProfileConversation", dataConver.idConver],
    fetchingProfile
  );

  useEffect(() => {
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
          //Count so mess is not read

          setIsRead(false);
          setLastMess(response.data[0]);
        } else {
          fetchDataRead();
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDataNotRead();
  }, [dataConver, click]);

  //fetch all data isRead: true
  const ChangeStateMessage = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8800/api/message/changeState/${dataConver.idConver}?userId=${dataConver.userConver}`
      );

      if (parseFloat(response.data)) {
        subtractionCount(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // click to choose conversation active
  function selectHandle(e) {
    setObjCurrentConver({
      id: dataConver.idConver,
      srcAvata: data.imageAvata,
      otherUserName: data.name,
      otherUserName_Id: dataConver.userConver,
    });
    ChangeStateMessage();
    setClick(!click);
  }

  return (
    <>
      {!isLoading && data ? (
        <li className="clearfix coverLay" onClick={selectHandle}>
          <img src={data.imageAvata} alt="avatar" />
          <div className="about">
            <div className="name">{data.name}</div>
            <div className="status">
              {lastMess && (
                <span className={!isRead ? "notRead" : undefined}>
                  {lastMess.text}
                </span>
              )}
            </div>
          </div>
        </li>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default ListConversation;
