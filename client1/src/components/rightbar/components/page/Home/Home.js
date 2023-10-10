import React from "react";
import "./home.css";
import TradingView from "../Right/TradingView/TradingView";
import WatchList from "../Right/WatchList/WatchList";
import Market from "../Right/Market/Market";

export default function Home() {

  return (
    <div className="container_home">
      <div className="container_left">Ben trai</div>
      <div className="container_right">
        <header>
          <h3>Header Right</h3>
        </header>
        <body className="container_body">

          <TradingView  />
          <Market  />
          <WatchList  />
        </body>
      </div>
    </div>
  );
}
