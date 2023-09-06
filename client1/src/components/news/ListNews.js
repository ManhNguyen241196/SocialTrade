import "./listNews.css";
import { Space, DatePicker, Button } from "antd";
import CardNews from "./CardNews";

const { RangePicker } = DatePicker;
const ListNews = () => {
  const DummyListNews = [
    {
      id: 1,
      title: "Cơ quan VARA của Dubai phạt sàn OPNX và các Founder",
      summary:
        "Chính sách bán hàng linh hoạt, bảo hành lên đến 10 năm hoặc 200.000 km, hỗ trợ tiền mặt hoặc voucher khi xe gặp lỗi, cam kết giá trị mua lại sau 5 năm và",
      imagePreview: "https://static.fireant.vn/Upload/20230823/images/a1-7.jpg",
      createdAt: "2023-08-22T13:46:36.702+00:00",
      coinSymbol: "BNBUSDT",
      coinState: "1.5%",
      link: "https://fireant.vn/bai-viet/canh-bao-tien-ao-lam-tang-rui-tai-chinh-o-cac-nuoc-dang-phat-trien/19232139",
    },
    {
      id: 2,
      title: "Lãi suất đảo chiều, ngành nào hưởng lợi?",
      summary:
        " Kể từ giữa tháng 3/2023, lãi suất chính sách của NHNN đã giảm 4 lần, cụ thể: lãi suất chiết khấu giảm 1,5% xuống còn 3,5%/năm, lãi suất táỳ ",
      imagePreview:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/23/1232416/Pham-Van-Thieu-Amt.JPG",
      createdAt: "2023-08-22T13:46:36.702+00:00",
      coinSymbol: "BLZUSDT",
      coinState: "1.5%",
      link: "https://fireant.vn/bai-viet/canh-bao-tien-ao-lam-tang-rui-tai-chinh-o-cac-nuoc-dang-phat-trien/19232139",
    },
    {
      id: 3,
      title: "Lãi suất cos tang hay khong đảo chiều, ngành nào hưởng lợi?",
      summary:
        " Kể từ giữa tháng 3/2023, lãi suất chính sách của NHNN đã giảm 4 lần, cụ thể: lãi suất chiết khấu giảm 1,5% xuống còn 3,5%/năm, lãi suất táỳ ",
      imagePreview:
        "https://static.fireant.vn/Upload/20230824/images/my_pham_nam_gioi.jpg",
      createdAt: "2023-08-22T13:46:36.702+00:00",
      coinSymbol: "BLZUSDT",
      coinState: "1.5%",
      link: "https://fireant.vn/bai-viet/canh-bao-tien-ao-lam-tang-rui-tai-chinh-o-cac-nuoc-dang-phat-trien/19232139",
    },
  ];

  return (
    <div className="ListNews">
      <Space className="ListNews_header" direction="horizontal" size={12}>
        <RangePicker />
        <Button type="primary">Filter</Button>
      </Space>
      {DummyListNews.map((item) => {
        return <CardNews key={item.id} itemNew={item} />;
      })}
    </div>
  );
};

export default ListNews;
