import React, { useContext, useState } from "react";
import "./watchlist.css";
import { SymbolContext } from "../../../../context/AllSymbolContext";
import { Button, Modal, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { DetailWatchList } from "./detailWatchList/DetailWatchList";
import CardCoin from "../Market/CardCoin/CardCoin";
import { WatchListContext } from "../../../../context/WatchListSymbolContext";

const watchListDummy = ["BTCUSDT", "BNBUSDT", "STMXUSDT"];

export default function WatchList() {
  const { symbol } = useContext(SymbolContext);
  const { symbol_watchList } = useContext(WatchListContext);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  // các thuộc tính của modal
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <div className="item container_watchlist">
      <header>Watch list</header>
      <div>
        <div className="body_tool">
          <Space wrap>
            <>
              <Button type="default " onClick={showModal}>
                <b>Edit</b> <EditOutlined />
              </Button>

              <Modal
                title="Edit"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <p>{modalText}</p>
                <DetailWatchList />
              </Modal>
            </>
          </Space>
        </div>
        <div className="body_show">
          {symbol_watchList.map((itemdata) => {
            return (
              <CardCoin
                itemdata={itemdata}
                key={`watchlist${itemdata}`}
                area="WL"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
