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
    <div className="bg-white rounded-[8px] p-5.5 shadow-[0px_1px_0px_0px_#FFFFFF40,inset_0px_1px_2px_0px_#00000026] w-full xl:w-[320px] border border-[#6F57DE26] flex flex-col h-full gap-[12px]">
      <h3 className="text-[14px] font-inter font-semibold text-[#1E293B] ">Target vs Sales</h3>

      {/* Main Container - The soft purple box with wavy liquid */}
      <div className="relative flex-1 min-h-[180px] w-full rounded-[10px] overflow-hidden bg-linear-to-b from-[#7705B4] to-[#A93BE4] shadow-[0px_24.72px_32.26px_0px_#5949BE57,inset_0px_1px_4px_2px_#F2D9FF,inset_0px_1px_18px_2px_#F2D9FF] ">
        {/* inner components div  */}
       <div className='absolute inset-px bg-white rounded-[10px] overflow-hidden'>
         {/* Soft Background (Light Purple / White) */}
        <div className="absolute inset-0 shadow-[inset_0px_1px_4px_2px_#F2D9FF,inset_0px_1px_18px_2px_#F2D9FF] z-20 bg-lineat-to-b from-white/5 via-[#7705B4]/20 to-white/5" />
        
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
      </div>

      {/* Values Section */}
      <div className="flex justify-between items-end  px-1">
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-inter text-[#424656] capitalize">Current</span>
          <span className="text-[14px] font-inter font-semibold text-[#191C1E] leading-none">{current}</span>
        </div>
        <div className="flex flex-col gap-1.5 text-right">
          <span className="text-[12px] font-inter text-[#424656] capitalize">Target</span>
          <span className="text-[14px] font-inter font-semibold text-[#191C1E] leading-none">{target}</span>
        </div>
      </div>
    </div>
  );
};

export default TargetVsSales;
