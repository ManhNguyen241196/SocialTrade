import { createContext, useState } from "react";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const addSocket = (newSocket) => {
    setSocket(newSocket);
  };

  return (
    <SocketContext.Provider value={{ addSocket, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
