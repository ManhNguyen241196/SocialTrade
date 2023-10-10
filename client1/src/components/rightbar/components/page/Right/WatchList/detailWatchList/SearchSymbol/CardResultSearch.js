import React from "react";
import "./cardResultSearch.css";

export default function CardResultSearch({ item }) {
  return (
    <div className="container_cardSearch">
      <span className="cardSearch_title">{item}</span>
      <span className="cardSearch_price"> 123.5 </span>
      <span className="cardSearch_change"> -0.2% </span>
    </div>
  );
}
