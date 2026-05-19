import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Building2, ArrowRight } from 'lucide-react';

import sidebarLogo from '../../assets/sidebarLogo.svg';
import logoText from '../../assets/logoText.svg';

const branches = [
  {
    id: 'dubai-main',
    type: 'Main Branch',
    name: 'Dubai Main',
    tag: 'HQ',
    progress: 80,
    current: '400,000',
    target: '500,000'
  },
  {
    id: 'abu-dhabi',
    type: 'North Branch',
    name: 'Abu Dhabi',
    tag: 'Regional',
    progress: 60,
    current: '350,000',
    target: '500,000'
  },
  {
    id: 'sharjah',
    type: 'South Branch',
    name: 'Sharjah',
    tag: 'Regional',
    progress: 40,
    current: '300,000',
    target: '500,000'
  },
  {
    id: 'ajman',
    type: 'West Branch',
    name: 'Ajman',
    tag: 'Local',
    progress: 80,
    current: '250,000',
    target: '500,000'
  }
];

const Donut = ({ currentStr, targetStr }) => {
  const current = parseInt(currentStr.replace(/,/g, ''), 10);
  const target = parseInt(targetStr.replace(/,/g, ''), 10);
  const targetPercentage = Math.round((current / target) * 100) || 0;

  const [percentage, setPercentage] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Small delay to ensure CSS transition is registered before updating
    const timer = setTimeout(() => {
      setPercentage(targetPercentage);
    }, 50);
    return () => clearTimeout(timer);
  }, [targetPercentage]);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1000;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out
      setDisplayValue(Math.floor(easeProgress * targetPercentage));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(targetPercentage);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetPercentage]);

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative flex items-center justify-center w-[130px] h-[130px] mx-auto my-8">
      <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_8px_16px_rgba(89,73,190,0.25)]" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="14"
        />
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="#5949BE"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-[22px] font-bold text-[#111827]">{displayValue}%</span>
    </div>
  );
};

const SelectBranch = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-inter">
      {/* Header */}
      <div 
        className="w-full sticky top-0 z-50 p-[0.5px] bg-linear-to-b from-[#5949BE] to-[#CD77FF] shadow-[0px_12px_32.26px_0px_#620DFF30,0px_24px_84.2px_0px_#620DFF57]"
       
      >
        <header 
          className="w-full h-[76px] bg-white px-6 sm:px-10 flex items-center justify-between 
          shadow-[inset_0px_1px_4px_2px_#E2D2FF,inset_0px_1px_18px_2px_#EBD2FF]"
          
        >
          <div className="flex items-center gap-3">
            <img src={sidebarLogo} alt="Forza Logo" className="w-[42px] h-[42px] object-contain" />
            <img src={logoText} alt="FORZA" className="h-[18px] w-auto object-contain" />
          </div>
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="hidden sm:block text-right mr-1">
              <p className="text-[11px] text-[#9CA3AF] font-medium leading-tight">Great to see you!</p>
              <p className="text-[14px] font-bold text-[#111827] leading-tight mt-0.5">Angel Delulu</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#DDD6FE] to-[#8B5CF6] text-white flex items-center justify-center font-bold text-sm ring-2 ring-offset-1 ring-white overflow-hidden shadow-sm">
              <img src="https://i.pravatar.cc/150?u=angel" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <ChevronRight size={18} className="text-[#9CA3AF]" strokeWidth={2.5} />
          </div>
        </header>
      </div>

      {/* Top Purple Glow */}
      <div className="w-full h-[180px] bg-linear-to-b from-[#F3E8FF] via-[#F3E8FF]/40 to-transparent absolute left-0 pointer-events-none"></div>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 sm:px-10 py-10 relative z-10">
        <div className="mb-10">
          <h1 className="text-[34px] font-extrabold font-manrope text-[#2B2F34] mb-2 tracking-tight">Select Branch</h1>
          <p className="text-[#585C62] text-[18px] max-w-2xl font-normal font-inter ">
            Overview of regional performance and sales goals. Select a branch to view detailed editorial analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((branch) => (
            <div 
              key={branch.id}
              onClick={() => navigate('/dashboard')}
              className="bg-white rounded-[12px] p-5 shadow-[0px_12px_32px_-4px_#2B2F340F] border border-[#AAADB426] hover:shadow-[0_12px_40px_rgba(89,73,190,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[12px] text-[#9CA3AF] font-medium tracking-wide font-inter mb-0.5">{branch.type}</p>
                  <h3 className="text-[18px] whitespace-nowrap font-bold text-[#111827] font-manrope">{branch.name}</h3>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#6B7280]">
                    <Building2 size={13} strokeWidth={2.5} />
                    {branch.tag}
                  </div>
                  <div className="w-[34px] h-[34px] rounded-xl bg-[#EDF1F8] text-[#5949BE] flex items-center justify-center">
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Progress Chart */}
              <Donut currentStr={branch.current} targetStr={branch.target} />

              {/* Card Footer */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-[#9CA3AF] font-bold tracking-widest mb-1 uppercase">Current</p>
                  <p className="text-[16px] font-bold text-[#111827]">{branch.current}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#9CA3AF] font-bold tracking-widest mb-1 uppercase">Target</p>
                  <p className="text-[16px] font-bold text-[#6B7280]">{branch.target}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SelectBranch;
