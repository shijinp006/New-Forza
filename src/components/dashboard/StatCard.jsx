import React from 'react';
import { Wallet, FileText, Banknote, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router';


/**
 * StatCard Component
 * Renders a statistic card with an icon, amount, and subtitle.
 * 
 * @param {Object} props
 * @param {string} props.title - The title of the card
 * @param {string} props.amount - The main value to display
 * @param {string} props.subtitle - Subtitle or additional info
 * @param {string} props.icon - Type of icon to show ('revenue', 'expenses', 'profit')
 * @param {string} props.color - Theme color for the icon background
 */
const StatCard = ({ title, amount, subtitle, icon, color }) => {
  const navigate = useNavigate();
  const isClickable = title === "Total Revenue" || title === "Total Expenses";

  const IconComponent = {
    revenue: Wallet,
    expenses: FileText,
    profit: Banknote,
  }[icon] || Wallet;

  const handleClick = () => {
    if (isClickable) {
      navigate('/dashboard/sale/revenue-details');
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`bg-white rounded-md p-5.5 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.8),inset_0px_-1px_1px_rgba(0,0,0,0.12)] flex flex-col gap-2.75 flex-1 min-w-[220px] border border-[#C19A0026] transition-all duration-300 ${
        isClickable ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <span className="text-[#8E8E8E] text-[14px] font-inter font-medium tracking-tight capitalize">{title}</span>
        <div className='rounded-lg w-fit h-fit flex items-center justify-center p-px bg-[conic-gradient(from_102.21deg_at_52.75%_38.75%,rgba(249,249,249,0.5)_-32.95deg,rgba(64,64,64,0.5)_10.52deg,rgba(64,64,64,0.35)_32.12deg,#FFFFFF_60.28deg,rgba(255,255,255,0.5)_107.79deg,rgba(64,64,64,0.35)_187.59deg,#F9F9F9_207.58deg,#FFFFFF_287.31deg,rgba(249,249,249,0.5)_327.05deg,rgba(64,64,64,0.5)_370.52deg)]  '>
          <div 
          className="p-2.5 bg-[#FFFBEC]/90 rounded-lg transition-transform hover:scale-110 cursor-default"
          style={{ color: color }}
        >
          <IconComponent size={22} strokeWidth={2} />
        </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[28px] font-bold font-inter text-[#191C1E] leading-none tracking-tight">
          <span className="text-[28px] font-bold  text-[#191C1E] mr-1.5">AED</span>
          {amount}
        </h3>
        <div className="flex items-center gap-1.5">
          {icon === 'expenses' && <TrendingDown size={14} className="text-[#EF4444]" />}
          {icon === 'revenue' && <TrendingUp size={14} className="text-[#006443]" />}
          
          <span className={`text-[14px] font-medium ${
            icon === 'expenses' ? 'text-[#EF4444]' : 
            icon === 'profit' ? 'text-[#726C6C]' : 
            'text-[#006443]'
          }`}>
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
