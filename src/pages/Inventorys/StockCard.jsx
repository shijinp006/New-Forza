import React from "react";
import StockCardFilter from "../components/inventory/StockCardFilter";
import StockCardTable from "../components/inventory/StockCardTable";
import { stockCardData } from "../constants/stockCardData";

const StockCard = () => {
  return (
    <div className="flex-1 bg-[#F7F8FC] p-4 md:p-8 overflow-y-auto min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6">
          <h1 className="text-[20px] font-bold text-[#1E293B]">Stock Card</h1>
          <p className="text-[14px] text-[#64748B] mt-2 max-w-[800px]">
            Detailed inventory movement report tracking quantities in, out, and
            running balances across all registered items.
          </p>
        </div>
        <StockCardFilter />
        <StockCardTable data={stockCardData} />
      </div>
    </div>
  );
};

export default StockCard;
