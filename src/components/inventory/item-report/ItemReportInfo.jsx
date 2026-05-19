import React from 'react';

const ItemReportInfo = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-4">
          <span className="text-[15px] font-medium text-[#1E293B] min-w-[120px]">{item.label}</span>
          <div className="flex-1 bg-[#F8FAFC] rounded-[8px] px-4 py-2 text-[14px] font-medium text-[#64748B] border border-[#F1F5F9]">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemReportInfo;
