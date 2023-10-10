// import React, { useState, useEffect, useRef } from "react";
// import moment from "moment";
// import axios from "axios";
// import { createChart, CrosshairMode } from "lightweight-charts";
// var chart = createChart(document.querySelector("body"), {
//   width: 600,
//   height: 300,
//   layout: {
//     background: {
//       type: "solid",
//       color: "#000000",
//     },
//     textColor: "rgba(255, 255, 255, 0.9)",
//   },
//   grid: {
//     vertLines: {
//       color: "rgba(197, 203, 206, 0.5)",
//     },
//     horzLines: {
//       color: "rgba(197, 203, 206, 0.5)",
//     },
//   },
//   crosshair: {
//     mode: CrosshairMode.Normal,
//   },
//   rightPriceScale: {
//     borderColor: "rgba(197, 203, 206, 0.8)",
//   },
//   timeScale: {
//     timeVisible: true,
//     secondsVisible: true,
//     borderColor: "rgba(197, 203, 206, 0.8)",
//   },
// });

// var candleSeries = chart.addCandlestickSeries({
//   upColor: "rgba(255, 144, 0, 1)",
//   downColor: "#000",
//   borderDownColor: "rgba(255, 144, 0, 1)",
//   borderUpColor: "rgba(255, 144, 0, 1)",
//   wickDownColor: "rgba(255, 144, 0, 1)",
//   wickUpColor: "rgba(255, 144, 0, 1)",
// });

// let text;
// const Price = () => {
//   const [tickerData, setTickerData] = useState([]);
//   const [error, setError] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     try {
//       const getData = async () => {
//         ref.current = setInterval(async () => {
//           // setRandomNum(Math.random() + Math.random() * 10);
//           const response = await axios.get(`http://localhost:8080/api/price`);
//           const alldata = [...response.data];
//           const fomartData = alldata.map((item) => {
//             return {
//               time:
//                 Date.parse(
//                   moment(item.closeTime).format("YYYY-MM-DD HH:mm:ss")
//                 ) / 1000,
//               open: parseFloat(item.open),
//               high: parseFloat(item.high),
//               low: parseFloat(item.low),
//               close: parseFloat(item.close),
//             };
//           });
//           if (candleSeries) {
//             candleSeries.setData([...fomartData]);
//           }
//           setTickerData(fomartData);
//         }, 2000);
//         return () => {
//           if (ref.current) {
//             clearInterval(ref.current);
//           }
//         };
//       };
//       getData();
//     } catch (error) {
//       setError(true);
//     }
//   }, []);

//   console.log(tickerData);

//   if (error) {
//     text = "mat ma ngg roi thang ngu";
//   } else {
//     text = "";
//   }
//   return (
//     <>
//       <div id="myChart">
//         <h1> hien thi cac component khac</h1>
//       </div>

//       <h1>{text}</h1>
//     </>
//   );
// };
// export default Price;
// TradingViewWidget.jsx

// TradingViewWidget.jsx

//--------------------------------them widget vao website
// import React, { useEffect, useRef } from "react";
// import "./price.css";
// let tvScriptLoadingPromise;

// export default function TradingViewWidget() {
//   const onLoadScriptRef = useRef();

//   useEffect(() => {
//     onLoadScriptRef.current = createWidget;

//     if (!tvScriptLoadingPromise) {
//       tvScriptLoadingPromise = new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.id = "tradingview-widget-loading-script";
//         script.src = "https://s3.tradingview.com/tv.js";
//         script.type = "text/javascript";
//         script.onload = resolve;

//         document.head.appendChild(script);
//       });
//     }

//     tvScriptLoadingPromise.then(
//       () => onLoadScriptRef.current && onLoadScriptRef.current()
//     );

//     return () => (onLoadScriptRef.current = null);

//     function createWidget() {
//       if (
//         document.getElementById("tradingview_27991") &&
//         "TradingView" in window
//       ) {
//         new window.TradingView.widget({
//           autosize: true,
//           symbol: "NASDAQ:AAPL",
//           timezone: "Etc/UTC",
//           theme: "dark",
//           style: "1",
//           locale: "en",
//           enable_publishing: true,
//           withdateranges: true,
//           range: "1D",
//           hide_side_toolbar: false,
//           allow_symbol_change: true,
//           details: true,
//           show_popup_button: true,
//           popup_width: "1000",
//           popup_height: "650",
//           container_id: "tradingview_27991",
//         });
//       }
//     }
//   }, []);

//   return (
//     <div className="tradingview-widget-container">
//       <div id="tradingview_27991" />
//     </div>
//   );
// }

//--------------------------------get giá của Symbol tại thời điểm hiện tại
// import React, { useEffect, useState } from "react";
// import Binance from "binance-api-node";
// import binanceApiNode from "binance-api-node";

// const client = Binance({
//   apiKey: "jWgGBP5BMIscd7BVtPI4ux2b1Od1pHxen4yrNbDT8mn2CwANCsjD3mkuZ3iBp59w",
//   apiSecret: "lRSxBmuatXIx5MK1oFvPIcg0o8BNmKj0J00UTlZwRnvYeN9X0DVwy6OkpicrwWOz",
// });

// export default function Price() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const myfunc = async () => {
//       const tradeArrs = await client.avgPrice({ symbol: "STMXUSDT" });
//       // const bidask = await client.book({ symbol: "STMXUSDT", limit: 3 });
//       // console.log("bid and ask:", bidask);
//       if (tradeArrs) {
//         // console.log("obj tradeArrs la", tradeArrs);
//         setData(tradeArrs);
//       }
//     };
//     const myInterval = setInterval(() => {
//       myfunc();
//     }, 200);
//   }, []);

//   useEffect(() => {
//     const myfunc2 = async () => {
//       const tradeArrs = await client.exchangeInfo({ symbol: "BTCUSDT" });
//       console.log("tickSize:  ", tradeArrs);
//     };
//     myfunc2();
//   }, []);

//   // client.time().then((time) => {
//   //   setData(time);
//   //   console.log(time);
//   // });
//   return (
//     <div>
//       <p>{data.price}</p>
//       <h2>"data.curDayClose"</h2>
//     </div>
//   );
// }

