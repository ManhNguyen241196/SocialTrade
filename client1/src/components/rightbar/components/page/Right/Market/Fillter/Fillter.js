import React from "react";
import { Button, Dropdown, message, Space } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  FallOutlined,
  RiseOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";

import Binance from "binance-api-node";

const client = Binance();

export default function Fillter({ setListSymbol, listSynmbol }) {
  let newListSymbol = [...listSynmbol];
  //method lọc---------------------------
  function filletMethod(array, keyFillter) {
    const sortedProducts = array.sort((p1, p2) =>
      parseFloat(p1[keyFillter]) < parseFloat(p2[keyFillter])
        ? 1
        : parseFloat(p1[keyFillter]) > parseFloat(p2[keyFillter])
        ? -1
        : 0
    );
    return sortedProducts;
  }

  const handleMenuClick = async (e) => {
    //các lọc còn lại---------------------------
    if (e.key !== "4") {
      try {
        const newPopularList = await Promise.all(
          newListSymbol
            .map(async (item) => {
              let itemFetch = await client.dailyStats({ symbol: item });
              if (itemFetch) {
                return itemFetch;
              }
            })
            .filter(Boolean) // remove undefined values
        );

        let newList = [];
        //// lọc quoteVolume và priceChangePercent--------------------------
        if (e.key === "3" || e.key === "2" || e.key === "1") {
          const property = e.key === "3" ? "quoteVolume" : "priceChangePercent";
          newList = [...filletMethod(newPopularList, property)].map(
            (item) => item.symbol
          );
          if (e.key === "1") {
            newList.reverse();
          }
        }
        setListSymbol(newList);
      } catch (error) {
        console.log(error);
      }
    }
    //lọc theo tên---------------------------
    if (e.key === "4") {
      setListSymbol([...newListSymbol].sort());
    }
  };

  const items = [
    {
      label: "Tăng %",
      key: "1",
      icon: <RiseOutlined />,
    },
    {
      label: "Giảm %",
      key: "2",
      icon: <FallOutlined />,
    },
    {
      label: "Khối lượng",
      key: "3",
      icon: <ArrowDownOutlined />,
    },
    {
      label: "Tên",
      key: "4",
      icon: <SortAscendingOutlined />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="fillter_container">
      <Space wrap>
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              <b>Fillter</b>
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Space>
    </div>
  );
}
