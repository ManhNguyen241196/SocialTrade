import { useNavigate } from "react-router-dom";
import "./searchRow.css";
import { Col, Row } from "antd";

const SearchRow = ({ dataUser }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`profile/${dataUser.id}`);
  };
  return (
    <div className="popupSearch_row" onClick={handleClick}>
      <Row>
        <Col className="popupSearch_row_col" span={5}>
          <img
            className="popupSearch_image"
            alt={dataUser.name}
            src={
              dataUser.avataUrl
                ? dataUser.avataUrl
                : "https://d2w9rnfcy7mm78.cloudfront.net/8040974/original_ff4f1f43d7b72cc31d2eb5b0827ff1ac.png?1595022778?bc=0"
            }
          />
        </Col>
        <Col className="popupSearch_row_col" span={19}>
          <div className="popupSearch_name"> {dataUser.name} </div>
        </Col>
      </Row>
    </div>
  );
};

export default SearchRow;
