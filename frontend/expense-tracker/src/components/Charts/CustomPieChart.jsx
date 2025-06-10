import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Label
} from "recharts";
import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomTooltip"; // Optional: your custom tooltip

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={130}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          {showTextAnchor && (
            <Label
              position="center"
              content={() => (
                <>
                  <text
                    x="50%"
                    y="50%"
                    dy={-25}
                    textAnchor="middle"
                    fill="#666"
                    fontSize="14px"
                  >
                    {label}
                  </text>
                  <text
                    x="50%"
                    y="50%"
                    dy={8}
                    textAnchor="middle"
                    fill="#333"
                    fontSize="24px"
                    fontWeight="semi-bold"
                  >
                    {totalAmount}
                  </text>
                </>
              )}
            />
          )}
        </Pie>
        <Tooltip content={CustomTooltip} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
