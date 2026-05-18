import React, { useState, useEffect } from 'react';

/**
 * TargetVsSales Component
 * Pixel-perfect redesign to match the reference image exactly.
 * The wave position is reactive to the percentage data.
 */
const TargetVsSales = ({ current = "124.5k", target = "160.0k" }) => {
  const currentNum = parseFloat(current.replace(/[^\d.-]/g, ''));
  const targetNum = parseFloat(target.replace(/[^\d.-]/g, ''));
  const targetPercentage = Math.round((currentNum / targetNum) * 100) || 0;

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentage(targetPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [targetPercentage]);

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0px_10px_40px_rgba(0,0,0,0.03)] w-full xl:w-[320px] border border-[#F1F5F9] flex flex-col h-full">
      <h3 className="text-[15px] font-bold text-[#1E293B] mb-8">Target vs Sales</h3>

      {/* Main Container - The soft purple box with wavy liquid */}
      <div className="relative flex-1 min-h-[180px] w-full rounded-[24px] overflow-hidden bg-white shadow-[0px_20px_50px_-10px_rgba(124,58,237,0.2)] border border-[#F1F2F6]">
        {/* Soft Background (Light Purple / White) */}
        <div className="absolute inset-0 bg-[#FBFBFF]" />
        
        {/* The Purple Liquid Area */}
        <div 
          className="absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out"
          style={{ height: `${percentage}%` }}
        >
          {/* Static Wave Top - Designed to match the reference curve exactly */}
          <div className="absolute top-[-30px] left-0 w-full h-[40px]">
            <svg 
              viewBox="0 0 400 40" 
              preserveAspectRatio="none" 
              className="w-full h-full fill-[#7C3AED]"
            >
              <path d="M0,20 C100,40 300,0 400,20 V40 H0 Z" />
            </svg>
          </div>
          
          {/* The main purple body with a subtle vertical gradient */}
          <div className="w-full h-full bg-gradient-to-b from-[#7C3AED] to-[#5949BE]" />
        </div>

        {/* Big Percentage Label - Centered within the liquid container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[52px] font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] tracking-tighter">
            {targetPercentage}%
          </span>
        </div>
      </div>

      {/* Values Section */}
      <div className="flex justify-between items-end mt-10 px-1">
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider">Current</span>
          <span className="text-[19px] font-black text-[#0F172A] leading-none">{current}</span>
        </div>
        <div className="flex flex-col gap-1.5 text-right">
          <span className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider">Target</span>
          <span className="text-[19px] font-black text-[#0F172A] leading-none">{target}</span>
        </div>
      </div>
    </div>
  );
};

export default TargetVsSales;
