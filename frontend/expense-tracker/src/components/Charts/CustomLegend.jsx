import React from "react";

const CustomLegend = ({ payload }) => {
  if (!payload || !Array.isArray(payload)) return null;

  return (
    <div className="flex justify-center gap-6 mt-4 flex-wrap">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
