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
 * OuterBar Component
 * Renders the background standing bar from top to bottom.
 */
const OuterBar = (props) => {
  const { x, y, width, height } = props;
  return (
    <foreignObject x={x - 20} y={y - 20} width={width + 40} height={height + 40}>
      <div style={{
        width: width,
        height: height,
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: '#EDE8EE',
        border: '1px solid #FAFAFA',
        borderRadius: '8px',
        boxShadow: 'inset -3px -3px 7px 0px #FFFFFF, inset 3px 3px 7px 0px #8896A394',
        boxSizing: 'border-box'
      }} />
    </foreignObject>
  );
};

/**
 * InnerBar Component
 * Renders the actual value bar with complex gradients, shadows, and padding.
 */
const InnerBar = (props) => {
  const { x, y, width, height, fill, value } = props;
  
  // Padding configuration
  const pTop = 8;
  const pLeft = 8;
  const pRight = 8;
  const pBottom = 0; // align bottom flush
  
  const innerWidth = width - pLeft - pRight;
  const innerHeight = Math.max(0, height - pTop - pBottom);
  
  return (
    <g>
      <foreignObject x={x - 20} y={y - 20} width={width + 40} height={height + 40}>
        <div style={{
          position: 'absolute',
          left: 20 + pLeft,
          top: 20 + pTop,
          width: innerWidth,
          height: innerHeight,
          background: `linear-gradient(${fill}, ${fill}) padding-box, linear-gradient(180deg, #EFEFEF 0%, rgba(183, 190, 196, 0.57) 100%) border-box`,
          borderRadius: '8px',
          border: '1px solid transparent',
          boxShadow: 'inset -5px -5px 10px 0px #8896A340, inset 5px 5px 5px 0px #FFFFFF, -4px -4px 10px 0px #FFFFFF66, 5px 5px 10px 0px #8896A366',
          boxSizing: 'border-box',
          transition: 'all 0.5s ease-out'
        }} />
      </foreignObject>
      <text 
        x={x + width / 2} 
        y={y - 15} 
        textAnchor="middle" 
        fill="#0F172A" 
        className="text-[18px] font-bold tracking-tight"
      >
        {value}
      </text>
    </g>
  );
};

/**
 * SalesByTransaction Component
 */
const SalesByTransaction = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-[12px] p-8 shadow-[0px_10px_40px_rgba(0,0,0,0.02)] flex-1 border border-[#F1F5F9]">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h3 className="text-[18px] font-bold text-[#2B2F34] font-manrope">Sales By Transaction</h3>
          <p className="text-[14px] font-medium text-[#585C62] mt-1 font-inter">Daily Sales vs Sales returns</p>
        </div>
        <button className="text-[#94A3B8] hover:text-[#4F46E5] transition-all p-1.5 hover:bg-gray-50 rounded-lg">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {mounted ? (
            <BarChart
              data={salesByTransactionData}
              margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              barSize={100} 
            >
              <CartesianGrid vertical={false} strokeDasharray="0" stroke="#F1F5F9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={false}
              />
              <YAxis 
                domain={[0, 5000]}
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
                ticks={[0, 1000, 2500, 5000]}
                tickFormatter={(v) => {
                  if(v === 5000) return '100k';
                  if(v === 2500) return '50k';
                  if(v === 1000) return '10k';
                  return '0';
                }}
              />
              <Tooltip cursor={{ fill: 'transparent' }} content={() => null} />
              <Bar 
                dataKey="value" 
                background={<OuterBar />}
                shape={<InnerBar />}
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

      {/* Legend markers matching image layout */}
      <div className="flex justify-start gap-8 mt-10 pl-6">
        {salesByTransactionData.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <span className="text-[12px] font-medium text-[#111827]">{item.name}</span>
            <div className="w-[20px] h-[20px] rounded-[4px] shadow-sm" style={{ backgroundColor: item.color }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesByTransaction;
