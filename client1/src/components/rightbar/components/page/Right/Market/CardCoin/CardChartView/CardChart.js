// TradingViewWidget.jsx

import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TradingViewWidget({ itemdata, area }) {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById(`idChart${itemdata}${area}`) &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          width: 140,
          height: 45,
          symbol: itemdata,
          interval: "60",
          timezone: "Asia/Ho_Chi_Minh",
          theme: "light",
          style: "2",
          locale: "en",
          enable_publishing: false,
          backgroundColor: "rgba(255, 255, 255, 1)",
          gridColor: "rgba(238, 238, 238, 0)",
          hide_top_toolbar: true,
          hide_legend: true,
          save_image: false,
          hide_volume: true,
          range: "1D",
          container_id: `idChart${itemdata}${area}`,
        });
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id={`idChart${itemdata}${area}`} />
    </div>
  );
}
