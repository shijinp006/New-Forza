import React, { useState, useMemo } from "react";
import RevenueSummary from "../../components/revenue/RevenueSummary";
import RevenueTable from "../../components/revenue/RevenueTable";
import { revenueTransactions } from "../../constants/revenueData";

const RevenueDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filteredData = useMemo(() => {
    return revenueTransactions.filter((item) => {
      const matchesSearch =
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterType === "All" ||
        item.type === filterType ||
        (filterType === "Paid" && item.type === "Split") || // Assuming split has some paid component
        (filterType === "Credit Sale" && item.type === "Split"); // Assuming split has some credit component

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterType]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  return (
    <div className="flex-1 bg-[#F7F8FC] p-4 md:p-8 overflow-y-auto min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <RevenueSummary
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

        <div className="mt-8">
          <RevenueTable data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default RevenueDetails;
