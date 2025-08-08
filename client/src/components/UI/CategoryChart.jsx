import React, { useEffect, useState } from "react";
import ChartTooltip from "./ChartTooltip";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import "../../styles/CategoryChart.css";

const API_URL = import.meta.env.VITE_APP_API_URL;
const COLORS = ["#990ae3", "#ff28b1", "#00c851", "#ffbb33", "#33b5e5"];

export default function CategoryChart({ filter = "all" }) {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        if (filter !== "all") params.append("filter", filter);

        const res = await fetch(`${API_URL}/api/admin/uploads?${params.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();
        const grouped = {};

        (json.uploads || []).forEach((item) => {
          grouped[item.category] = (grouped[item.category] || 0) + 1;
        });

        const formatted = Object.entries(grouped).map(([category, count]) => ({
          name: category,
          value: count,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error loading category data:", err);
      }
    };

    fetchData();
  }, [filter]);

  const renderCustomizedLabel = ({ percent }) =>
    `${(percent * 100).toFixed(0)}%`;

  return (
    <div className="category-chart-container">
      <h3>Distribuție pe categorii ({filter})</h3>
      {data.length === 0 ? (
        <p style={{ color: "#888" }}>Nicio categorie disponibilă.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}