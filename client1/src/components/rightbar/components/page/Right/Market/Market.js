import React, { useContext, useEffect, useMemo, useState } from "react";
import "./market.css";
import Fillter from "./Fillter/Fillter";
import CardCoin from "./CardCoin/CardCoin";
import Binance from "binance-api-node";
import { SymbolContext } from "../../../../context/AllSymbolContext";

const client = Binance();

export default function Market() {
  const { addSymbol } = useContext(SymbolContext);
  const currentUser = 1;
  const [listSynmbol, setListSymbol] = useState([
    "ETHUSDT",
    "BTCUSDT",
    "BNBUSDT",
    "STMXUSDT",
  ]);

  useMemo(() => {
    const fetchSymbol = async () => {
      try {
        let allPrice = await client.prices();

        const result = Object.keys(allPrice).filter(
          (word) =>
            word.endsWith("USDT") &&
            !word.includes("UP") &&
            !word.includes("DOWN")
        );
        console.log("allPrice USDT: ", result);
        addSymbol(result);
        setListSymbol([...result]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSymbol();
  }, [currentUser]);

  //dummy data se dk luc sau khi fetch từ binance về từ Home.js
  // const listSynmbol = ["BTCUSDT", "BNBUSDT", "ETHUSDT", "ETHUSD", "STMXUSDT"];
  const setNewList = (param) => {
    setListSymbol(param);
  };
  // sẽ sử dụng console.log(await client.dailyStats({ symbol: 'ETHBTC' }))  để fetch data để lọc ra array market .
  //  Tất nhiên cái này chỉ cập nhật 1 lần duy nhất khi được load lại trang
  return (
    <div className="item container_market">
      <header className="market_header">Market</header>
      <div>
        <div className="body_tool">
          <Fillter setListSymbol={setNewList} listSynmbol={listSynmbol} />
        </div>
        <div className="body_show">
          {listSynmbol.slice(0, 5).map((itemdata) => {
            return <CardCoin itemdata={itemdata} key={`market${itemdata}`} />;
          })}
        </div>
      </div>
      <footer>
        <a href="https://www.binance.com/vi/markets/overview" target="_blank">
          Show more
        </a>
      </footer>
    </div>
  );
}
