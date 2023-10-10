import React, { useContext, useEffect, useState } from "react";
import "./searchSymbol.css";
import { Button, Input, Space, Popover } from "antd";
import CardResultSearch from "./CardResultSearch";
import { Divider, List } from "antd";
import { SymbolContext } from "../../../../../../context/AllSymbolContext";
import { WatchListContext } from "../../../../../../context/WatchListSymbolContext";

export default function SearchSymbol() {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [searchArr, setSearchArr] = useState([]);

  //list dummny này se dk in ra sau moi lan fillter.
  const { symbol } = useContext(SymbolContext);
  const { addSymbol_watchList, symbol_watchList } =
    useContext(WatchListContext);

  const updateSearchFunc = (text) => {
    let result = symbol.filter((word) => word.includes(text.toUpperCase()));
    setSearchArr([...result]);
  };

  const addWatchList = (item) => {
    addSymbol_watchList(item);
    console.log("item", item);
  };
  //function nay phai return ra 1 list giá trị sau khi fillter
  const contentSearch = () => {
    return (
      <List
        style={{ height: "200px", overflowY: "scroll" }}
        bordered
        dataSource={searchArr}
        renderItem={(item) => (
          <List.Item className="listItem">
            <CardResultSearch key={item} item={item} />
            {symbol_watchList.some((ele) => ele === item) ? (
              ""
            ) : (
              <button
                id="btnAdd"
                onClick={() => {
                  addWatchList(item);
                }}
              >
                Add
              </button>
            )}
          </List.Item>
        )}
      />
    );
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
    updateSearchFunc(e.target.value);
  };

  //show modal search
  const handleSearch = () => {
    setOpen(true);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <>
      <Space.Compact
        style={{
          width: "100%",
        }}
      >
        <Popover
          content={contentSearch}
          title="Result"
          open={open}
          onOpenChange={handleOpenChange}
          placement="bottomLeft"
        >
          <Input
            onChange={handleChange}
            placeholder="Enter name of coin"
            defaultValue=""
            value={searchText}
          />
        </Popover>
        <Button onClick={handleSearch} type="primary">
          Search
        </Button>
      </Space.Compact>
    </>
  );
}
