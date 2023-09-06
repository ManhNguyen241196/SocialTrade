import moment from "moment/moment";
import "./cardNews.css";
import { Col, Row, Modal } from "antd";
import { useState } from "react";
const CardNews = ({ itemNew }) => {
  const [openModal, setOpenModal] = useState(false);

  const openNewsHandle = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Row className="container" onClick={openNewsHandle}>
        <Col className="colImg col" span={6}>
          <img src={itemNew.imagePreview} />
        </Col>
        <Col className="colContent col" span={18}>
          <Row className=" colContent_lable ">
            <span className="colContent_lable_name">{itemNew.coinSymbol}</span>
            <span className="colContent_lable_value">{itemNew.coinState}</span>
          </Row>
          <Row className=" colContent_title">
            <a>{itemNew.title}</a>
          </Row>
          <Row className=" colContent_content">
            <p>{itemNew.summary}</p>
          </Row>
          <Row className=" colContent_date ">
            <p>{moment(itemNew.createdAt).fromNow()}</p>
          </Row>
        </Col>
      </Row>
      <Modal
        title="Basic Modal"
        open={openModal}
        onCancel={handleCancel}
        footer={null}
      >
        content news
      </Modal>
    </>
  );
};

export default CardNews;
