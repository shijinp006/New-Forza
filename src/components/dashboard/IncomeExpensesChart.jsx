import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowUpRight } from 'lucide-react';
import { incomeExpensesData } from '../../constants/dashboardData';

/**
 * IncomeExpensesChart Component
 * Renders a donut chart comparing Income and Expenses.
 */
const IncomeExpensesChart = () => {
  const total = incomeExpensesData.reduce((acc, curr) => acc + curr.value, 0);
  const [mounted, setMounted] = useState(false);
  const [animatedEndAngle, setAnimatedEndAngle] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    let startTimestamp = null;
    const duration = 1500;
    const startAngle = 0;
    const totalSweep = 360;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      
      setAnimatedEndAngle(startAngle + (easeProgress * totalSweep));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [mounted]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] w-full lg:w-[350px]">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-[#081021]">Income vs Expenses</h3>
          <p className="text-sm text-[#8E8E8E]">Outstanding Balances</p>
        </div>
        <button className="text-[#5949BE] text-xs font-semibold flex items-center gap-1 hover:underline">
          View Full <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="h-[220px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          {mounted ? (
            <PieChart>
              <Pie
                data={incomeExpensesData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                startAngle={0}
                endAngle={animatedEndAngle}
                isAnimationActive={false}
                stroke="none"
              >
                {incomeExpensesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          ) : null}
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[11px] text-[#94A3B8] font-bold uppercase tracking-wider">Total</span>
          <div className="flex items-baseline mt-0.5">
             <span className="text-[12px] font-bold text-[#94A3B8] mr-1">AED</span>
             <span className="text-[22px] font-extrabold text-[#081021] leading-none">56.2k</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {incomeExpensesData.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm font-medium text-[#081021]">{item.name} :</span>
              <span className="text-sm text-[#8E8E8E] font-semibold">{item.value / 1000}k</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeExpensesChart;
