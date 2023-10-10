import React, { useContext, useEffect, useState } from "react";
import { Table, Space } from "antd";
import SearchSymbol from "./SearchSymbol/SearchSymbol";
import { WatchListContext } from "../../../../../context/WatchListSymbolContext";
import Binance from "binance-api-node";

const client = Binance();

export const DetailWatchList = () => {
  const [list, setList] = useState([]);

  //show table watch list
  const { symbol_watchList, update_watchList } = useContext(WatchListContext);

  // render data theo form table
  useEffect(() => {
    const renderData = async (watchLists) => {
      const neww = await Promise.all(
        watchLists.map(async (item) => {
          let symbolDetail = await client.dailyStats({ symbol: item });

          if (symbolDetail) {
            const priceCur = symbolDetail.prevClosePrice;
            const changeCur = symbolDetail.priceChangePercent;

            let data = {
              key: item,
              name: item,
              price: priceCur,
              change: changeCur,
            };

            return data;
          }
        })
      );
      setList(neww);
      return neww;
    };

    if (symbol_watchList) {
      renderData(symbol_watchList);

      // setList(renderData(symbol_watchList));
    }
  }, [symbol_watchList]);

  //Control table watchlist
  const handleDelete = (pra) => {
    const result = symbol_watchList.filter((word) => word !== pra);
    update_watchList(result);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Prices",
      dataIndex: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 2,
      },
    },
    {
      title: "Change %",
      dataIndex: "change",
      sorter: {
        compare: (a, b) => a.change - b.change,
        multiple: 1,
      },
      render: (text) => {
        const value = parseFloat(text).toFixed(2);
        const style = {
          color: parseFloat(text) < 0 ? "red" : "green",
        };
        return <p style={style}>{value}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              handleDelete(record.key);
            }}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  // const data = [
  //   {
  //     key: "BTCUSDT",
  //     name: "BTCUSDT",
  //     price: 98,
  //     change: 60,
  //   },
  //   {
  //     key: "BNBUSDT",
  //     name: "BNBUSDT",
  //     price: 98,
  //     change: 66,
  //   },
  //   {
  //     key: "ETHUSDT",
  //     name: "ETHUSDT",
  //     price: 98,
  //     change: 90,
  //   },
  //   {
  //     key: "NEOUSDT",
  //     name: "NEOUSDT",
  //     price: 88,
  //     change: 99,
  //   },
  // ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="container_watchList">
      <header>
        <SearchSymbol />
      </header>
      <div className="table_watchlist">
        {list && (
          <Table columns={columns} dataSource={list} onChange={onChange} />
        )}
      </div>
    </div>
  );
};
