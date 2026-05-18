import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { MoreVertical } from 'lucide-react';
import { salesByTransactionData } from '../../constants/salesData';

/**
 * Custom Bar Component
 * Matches the reference image's deep inner shadows and bold capsule bars.
 */
const CustomBar = (props) => {
  const { x, y, width, height, fill, value } = props;
  const radius = 20; // Full pill rounding
  const trackHeight = 240;
  const trackY = 0;

  return (
    <g>
      <defs>
        {/* Advanced Inner Shadow Filter */}
        <filter id="deepInnerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="4" />
          <feOffset dx="2" dy="4" result="offsetblur" />
          <feFlood floodColor="#000" floodOpacity="0.1" />
          <feComposite operator="in" in2="offsetblur" />
          <feComposite operator="in" in2="SourceAlpha" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background Track with Deep Inset Shadow */}
      <rect 
        x={x} 
        y={trackY} 
        width={width} 
        height={trackHeight} 
        rx={radius} 
        fill="#F8FAFC"
        filter="url(#deepInnerShadow)"
      />
      
      {/* Active Bar Capsule - Matches exact colors and rounded look */}
      <rect 
        x={x + 4} // Inset padding
        y={y} 
        width={width - 8} 
        height={height} 
        rx={radius - 4} 
        fill={fill} 
        className="transition-all duration-1000 ease-out"
      />
      
      {/* Label above the active bar */}
      <text 
        x={x + width / 2} 
        y={y - 15} 
        textAnchor="middle" 
        fill="#0F172A" 
        className="text-[15px] font-black tracking-tight"
      >
        {value}
      </text>
    </g>
  );
};

/**
 * SalesByTransaction Component
 * Optimized for exact visual replication of the reference design.
 */
const SalesByTransaction = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-[24px] p-8 shadow-[0px_10px_40px_rgba(0,0,0,0.02)] flex-1 border border-[#F1F5F9]">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h3 className="text-[16px] font-bold text-[#1E293B]">Sales By Transaction</h3>
          <p className="text-[13px] font-medium text-[#94A3B8] mt-1">Daily Sales vs Sales returns</p>
        </div>
        <button className="text-[#94A3B8] hover:text-[#4F46E5] transition-all p-1.5 hover:bg-gray-50 rounded-lg">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {mounted ? (
            <BarChart
              data={salesByTransactionData}
              margin={{ top: 20, right: 30, left: -20, bottom: 0 }}
              barSize={80} 
            >
              <CartesianGrid vertical={false} strokeDasharray="0" stroke="#F1F5F9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 13, fontWeight: 700 }}
                dy={15}
              />
              <YAxis 
                domain={[0, 6000]}
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
                ticks={[0, 1500, 3000, 4500, 6000]}
                tickFormatter={(v) => v === 0 ? '0' : `${v / 1000}k`}
              />
              <Tooltip cursor={{ fill: 'transparent' }} content={() => null} />
              <Bar 
                dataKey="value" 
                shape={<CustomBar />}
                animationDuration={1500}
                animationBegin={0}
                isAnimationActive={true}
              >
                {salesByTransactionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          ) : null}
        </ResponsiveContainer>
      </div>

      {/* Square Legend markers exactly like image */}
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-12">
        {salesByTransactionData.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <span className="text-[14px] font-bold text-[#64748B]">{item.name}</span>
            <div className="w-5 h-5 rounded-[6px] shadow-sm" style={{ backgroundColor: item.color }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesByTransaction;
