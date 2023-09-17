import { useContext, useEffect, useState } from "react";
import ListNoti from "../../components/listNoti/ListNoti";
import "./noti.css";
import { UserContext } from "../../context/UserContext";
import fetchNoti from "../../method/createNoti";

const Noti = () => {
  const { currentUser } = useContext(UserContext);
  const [dataNoti, setDataNoti] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //fetch all Noti
  //fetch profile User
  useEffect(() => {
    setIsLoading(true);
    fetchNoti("all", "all", currentUser, setDataNoti, setIsLoading);
  }, [currentUser]);

  const DeleteCurData = (id) => {
    const newArr = dataNoti.filter((item) => item._id !== id);
    setDataNoti(newArr);
    console.log("Delete", dataNoti);
  };
  const ChangeCurData = (id) => {
    const found = dataNoti.find((element) => element._id === id);
    if (!found.isMark) {
      found.isMark = true;
    }
    setDataNoti([...dataNoti]);
    console.log("ChangeCurData", dataNoti);
  };

  return (
    <div className="home">
      <h3>Notification </h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="listNotiTable">
          <ul className="listNotiTable_container">
            {dataNoti &&
              dataNoti.map((item) => {
                return (
                  <ListNoti
                    key={item._id}
                    dataNoti={item}
                    ChangeCurData={ChangeCurData}
                    DeleteCurData={DeleteCurData}
                  />
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Noti;
