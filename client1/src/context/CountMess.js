import { createContext, useState } from "react";

export const CountMessContext = createContext();

export const CountMessProvider = ({ children }) => {
  const [currCount, setCurrCount] = useState(0);

  const addCount = (newCount) => {
    setCurrCount((prev) => {
      return parseFloat(prev) + parseFloat(newCount);
    });
  };

  const subtractionCount = (count) => {
    setCurrCount((prev) => {
      return parseFloat(prev) - parseFloat(count);
    });
  };
  return (
    <CountMessContext.Provider
      value={{ addCount, currCount, subtractionCount }}
    >
      {children}
    </CountMessContext.Provider>
  );
};
