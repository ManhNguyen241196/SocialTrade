import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userId")) || null
  );

  const [currentToken, setCurrentToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );

  const [currentAvata, setCurrentAvata] = useState(null);

  const addUser = (newUser) => {
    localStorage.setItem("userId", JSON.stringify(newUser));
    setCurrentUser(newUser);
  };

  const addToken = (newToken) => {
    setCurrentToken(newToken);
  };

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(currentToken));
  }, [currentToken]);

  const fetchAvata = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8800/api/profile?userID=" + currentUser
      );
      setCurrentAvata(result.data[0].imageAvata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchAvata();
    }
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        addUser,
        addToken,
        currentToken,
        currentAvata,
        fetchAvata,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
