import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingUp } from "lucide-react";

const CustomBar = (props) => {
  const { x, y, width, height, isBg } = props;

  if (isBg) {
    return (
      <foreignObject x={x - 20} y={y - 20} width={width + 40} height={height + 40}>
        <div
          style={{
            width: width,
            height: height,
            marginTop: 20,
            marginLeft: 20,
            backgroundColor: "#EDE8EE",
            border: "1px solid #FFFFFF",
            borderRadius: "8px",
            boxShadow: "inset -3px -3px 7px 0px #FFFFFF, inset 3px 3px 7px 0px #8896A394",
            boxSizing: "border-box"
          }}
        />
      </foreignObject>
    );
  }

  const innerWidth = width - 12;
  const innerHeight = Math.max(0, height - 12);

  return (
    <foreignObject x={x - 20} y={y - 20} width={width + 40} height={height + 40}>
      <div
        style={{
          width: innerWidth,
          height: innerHeight,
          marginTop: 26,
          marginLeft: 26,
          background: "linear-gradient(135deg, #EFEFEF, #B7BEC491)",
          padding: "0px",
          borderRadius: "5px",
          boxShadow: "-4px -4px 10px 0px #FFFFFF66, 5px 5px 10px 0px #8896A366",
          boxSizing: "border-box"
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#6F57DE",
            borderRadius: "5px",
            boxShadow: "inset -5px -5px 10px 0px #8896A340, inset 5px 5px 5px 0px #FFFFFF",
            boxSizing: "border-box"
          }}
        />
      </div>
    </foreignObject>
  );
};

const ItemPerformanceChart = ({ data }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[16px] font-bold text-[#1E293B]">
            Item Sales Performance Trend
          </h3>
          <p className="text-[12px] font-medium text-[#94A3B8] mt-1">
            Weekly volume across all categories
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-[28px] font-black text-[#1E293B] leading-none tracking-tight mb-1">
            84,250
          </h2>
          <div className="flex items-center justify-end gap-1 text-[12px] font-bold text-[#9D174D]">
            <TrendingUp size={14} strokeWidth={3} />
            <span>+12.5% vs last week</span>
          </div>
        </div>
      </div>

      <div className="h-[270px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          {mounted ? (
            <BarChart
              data={data}
              margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
              barSize={32}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#F1F5F9"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={(props) => {
                  const { x, y, payload } = props;
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <circle cx="0" cy="10" r="3" fill="#5949BE" />
                      <text
                        x="0"
                        y="28"
                        fill="#94A3B8"
                        fontSize="12"
                        fontWeight="500"
                        textAnchor="middle"
                      >
                        {payload.value}
                      </text>
                    </g>
                  );
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
                tickFormatter={(val) => (val === 0 ? "0" : val)}
              />
              <Bar
                dataKey="value"
                background={<CustomBar isBg={true} />}
                shape={<CustomBar />}
                animationDuration={1500}
                animationBegin={0}
              />
            </BarChart>
          ) : null}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ItemPerformanceChart;
