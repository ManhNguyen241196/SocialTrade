import { createContext, useState } from "react";

export const SymbolContext = createContext();

export const SymbolProvider = ({ children }) => {
  const [symbol, setSymbol] = useState([]);

  const addSymbol = (newSymbols) => {
    setSymbol(newSymbols);
  };

  return (
    <SymbolContext.Provider value={{ addSymbol, symbol }}>
      {children}
    </SymbolContext.Provider>
  );
};
