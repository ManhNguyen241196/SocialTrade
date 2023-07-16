import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userId")) || null
  );

  const [currentToken, setCurrentToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );

  const addUser = (newUser) => {
    localStorage.setItem("userId", JSON.stringify(newUser));
    setCurrentUser(newUser);
  };

  const addToken = (newToken) => {
    setCurrentToken(newToken);
  };

  //save userId to localStorage.
  // useEffect(() => {
  //   if (currentUser) {
  //     localStorage.setItem("userId", JSON.stringify(currentUser));
  //     console.log("set data in localstorage");
  //   }
  // }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(currentToken));
  }, [currentToken]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        addUser,
        addToken,
        currentToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
