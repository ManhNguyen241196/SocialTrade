import React, { useEffect, useState } from "react";
import "./cardcoin.css";
import { Col, Row } from "antd";
import TradingView_Card from "./CardChartView/CardChart";
import Binance from "binance-api-node";

const client = Binance();
export default function CardCoin({ itemdata, area }) {
  const [dataSymbol, setDataSymbol] = useState(null);

  // useEffect(() => {
  //   const FetchInterval = async () => {
  //     try {
  //       let itemFetch = await client.dailyStats({ symbol: itemdata });
  //       if (itemFetch) {
  //         setDataSymbol(itemFetch);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const myInterval = setInterval(() => {
  //     FetchInterval();
  //   }, 200);
  // }, []);

  useEffect(() => {
    let fetchInterval;
    const FetchInterval = async () => {
      try {
        const itemFetch = await client.dailyStats({ symbol: itemdata });
        if (itemFetch) {
          setDataSymbol(itemFetch);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInterval = setInterval(FetchInterval, 200);
    return () => clearInterval(fetchInterval);
  }, [itemdata]);

  return (
    <div className="container_card">
      <Row>
        <Col className="container_card-symbol col" span={7}>
          <div className="title"> {itemdata} </div>
          <div className="sourceData">Chỉ số từ Binance</div>
        </Col>
        <Col className="container_card-chart col" span={10}>
          <TradingView_Card
            itemdata={itemdata}
            area={area}
            key={`watchlist${itemdata}${area}`}
          />
        </Col>
        {/* phan này fetch từ console.log(await client.dailyStats({ symbol: 'ETHBTC' })) */}
        <Col className="container_card-price col" span={7}>
          <span className="price_value">
            {" "}
            {dataSymbol
              ? parseFloat(dataSymbol.prevClosePrice).toFixed(4)
              : ""}{" "}
          </span>
          {dataSymbol && (
            <span
              className={
                parseFloat(dataSymbol.priceChange) > 0
                  ? "price_raito up"
                  : "price_raito down"
              }
            >
              {`${parseFloat(dataSymbol.priceChange).toFixed(3)}/${parseFloat(
                dataSymbol.priceChangePercent
              ).toFixed(2)}%`}
            </span>
          )}
        </Col>
      </Row>
    </div>
  );
}
