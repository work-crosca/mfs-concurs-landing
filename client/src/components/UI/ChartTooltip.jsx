import React from "react";
import "../../styles/ChartTooltip.css";

export default function ChartTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const { name, value } = payload[0];

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{name}</p>
      <p className="chart-tooltip-value">{value} imagini</p>
    </div>
  );
}