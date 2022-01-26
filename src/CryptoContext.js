import { duration } from "@material-ui/core";
import React, { createContext, useContext, useState, useEffect } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("GBP");
  const [symbol, setSymbol] = useState("£");

  useEffect(() => {
    // if (currency === "GBP") {
    //   setSymbol("£");
    // } else if (currency === "USD") {
    //   setSymbol("$");
    // }
    switch (currency) {
      case "GBP":
        setSymbol("£");
        break;
      case "USD":
        setSymbol("$");
        break;
      case "EUR":
        setSymbol("€");
        break;
      case "JPY":
        setSymbol("¥");
        break;
      case "AUD":
        setSymbol("$");
        break;
      default:
        setSymbol("£");
        break;
    }
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
