import React from "react";
import { IoCashOutline, IoWalletOutline } from "react-icons/io5";
import {
  CircleDollarSign,
  TrendingUp,
  TrendingDown,
  ReceiptText,
} from "lucide-react";
import { useNavigate } from "react-router";

import { TbTruckReturn } from "react-icons/tb";

/**
 * SalesStatCard Component
 * Renders a statistic card specifically for Sales Analysis.
 *
 * @param {Object} props
 * @param {string} props.title - The title of the card
 * @param {string} props.amount - The main value to display
 * @param {string} props.subtitle - Subtitle or additional info
 * @param {string} props.icon - Type of icon to show
 * @param {string} props.color - Theme color for the icon background
 */
const SalesStatCard = ({ title, amount, subtitle, icon, color }) => {
  const navigate = useNavigate();

  const isRevenue = title === "Total Sales";
  const isOutstanding = title === "Customer Outstanding";
  const isClickable = isRevenue || isOutstanding;

  const handleClick = () => {
    if (isRevenue) navigate("/dashboard/sale/revenue-details");
    if (isOutstanding) navigate("/dashboard/sale/customer-outstanding");
  };

  const IconComponent =
    {
      "total-sales": IoCashOutline,
      returns: TbTruckReturn,
      "net-sales": IoWalletOutline,
      outstanding: ReceiptText,
    }[icon] || CircleDollarSign;

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-[5px] p-5 shadow-[0px_4px_12px_rgba(0,0,0,0.12),inset_-1px_-1px_1px_rgba(0,0,0,0.15),inset_1px_1px_1px_rgba(255,255,255,1)] flex flex-col gap-[12px] flex-1 min-w-[200px] border border-gray-50 transition-all duration-300 ${
        isClickable ? "cursor-pointer hover:shadow-xl hover:-translate-y-1" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <span className="text-[#585C62] text-[13px] font-inter tracking-tight capitalize">
          {title}
        </span>
        <div
          className="p-2.5 rounded-xl transition-transform hover:scale-110 cursor-default shadow-sm"
          style={{ backgroundColor: `${color}10`, color: color }}
        >
          <IconComponent size={22} strokeWidth={2} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-[28px] font-extrabold text-[#2B2F34] font-manrope leading-none tracking-tight">
          <span className="text-[28px] font-bold text-[#2B2F34] mr-1.5 font-mono">
            Ð
          </span>
          {amount}
        </h3>
        <div className="flex items-center gap-1.5">
          {icon === "returns" ? (
            <TrendingDown size={14} className="text-[#726C6C]" />
          ) : (
            <TrendingUp size={14} className="text-[#726C6C]" />
          )}
          <span className={`text-[14px] font-medium text-[#726C6C]`}>
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalesStatCard;
