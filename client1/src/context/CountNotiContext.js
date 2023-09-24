import { createContext, useState } from "react";

export const CountNotiContext = createContext();

export const CountNotiProvider = ({ children }) => {
  const [currCountNoti, setCurrCountNoti] = useState(0);
  const [currCountNoti_follow, setCurrCountNoti_follow] = useState(0);

  const loadCountNoti = (loadCount) => {
    setCurrCountNoti(parseFloat(loadCount));
  };

  const addCountNoti = (newCount) => {
    setCurrCountNoti((prev) => {
      return parseFloat(prev) + parseFloat(newCount);
    });
  };

  const subtractionCountNoti = (count) => {
    setCurrCountNoti((prev) => {
      return parseFloat(prev) - parseFloat(count);
    });
  };

  //---------------------------------------------------
  const loadCountNoti_follow = (loadCount) => {
    setCurrCountNoti_follow(parseFloat(loadCount));
  };

  const addCountNoti_follow = (newCount) => {
    setCurrCountNoti_follow((prev) => {
      return parseFloat(prev) + parseFloat(newCount);
    });
  };

  const subtractionCountNoti_follow = (count) => {
    setCurrCountNoti_follow((prev) => {
      return parseFloat(prev) - parseFloat(count);
    });
  };
  return (
    <CountNotiContext.Provider
      value={{
        loadCountNoti,
        addCountNoti,
        currCountNoti,
        subtractionCountNoti,
        loadCountNoti_follow,
        addCountNoti_follow,
        currCountNoti_follow,
        subtractionCountNoti_follow,
      }}
    >
      {children}
    </CountNotiContext.Provider>
  );
};
