import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useNavigate } from 'react-router';
import { productMovementData } from '../../constants/dashboardData';


/**
 * ProductMovementChart Component
 * Renders a donut chart for product movement tracking.
 */
const ProductMovementChart = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [animatedEndAngle, setAnimatedEndAngle] = useState(90);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    let startTimestamp = null;
    const duration = 1500;
    const startAngle = 90;
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

  const handleClick = () => {
    navigate('/dashboard/total-products');
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] w-full lg:w-[350px] border border-[#F3F4F6] cursor-pointer hover:shadow-lg transition-all duration-300"
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[#081021]">Product Movement</h3>
      </div>

      <div className="h-[180px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          {mounted ? (
            <PieChart>
              <Pie
                data={productMovementData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={70}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={animatedEndAngle}
                isAnimationActive={false}
              >
                {productMovementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : null}
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[9px] text-[#8E8E8E] font-medium uppercase text-center w-20 leading-tight">Total Items</span>
          <span className="text-xl font-bold text-[#081021]">10,000</span>
        </div>
      </div>

      <div className="flex justify-center gap-8 mt-4">
        {productMovementData.map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[11px] font-bold text-[#9CA3AF] uppercase">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-[#081021]">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductMovementChart;
