import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [symbol_watchList, setSymbol_watchList] = useState([
    "BTCUSDT",
    "BNBUSDT",
    "NEOUSDT",
  ]);

  const addSymbol_watchList = (newSymbol) => {
    setSymbol_watchList((prev) => {
      return [...prev, newSymbol];
    });
  };

  const update_watchList = (newSymbol) => {
    setSymbol_watchList([]);
    setSymbol_watchList(newSymbol);
  };
  return (
    <WatchListContext.Provider
      value={{ addSymbol_watchList, symbol_watchList, update_watchList }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
