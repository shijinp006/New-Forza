import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { hourlySalesData } from '../../constants/dashboardData';

/**
 * HourlySalesChart Component
 * Renders a line/area chart showing performance throughout the day.
 */
const HourlySalesChart = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex-1 min-w-[300px] lg:min-w-[450px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#081021]">Hourly Sales</h3>
          <p className="text-sm text-[#8E8E8E]">Monthly performance vs target</p>
        </div>
        <div className="bg-[#F3F4F6] text-[#9CA3AF] text-[10px] font-bold px-2 py-1 rounded">
          Today
        </div>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {mounted ? (
            <AreaChart
              data={hourlySalesData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5949BE" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#5949BE" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#8E8E8E', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#8E8E8E', fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#5949BE" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSales)" 
                animationDuration={1500}
                animationBegin={0}
                isAnimationActive={true}
              />
            </AreaChart>
          ) : null}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HourlySalesChart;
