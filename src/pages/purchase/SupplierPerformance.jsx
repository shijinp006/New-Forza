import React, { useState, useMemo } from "react";
import SupplierPerformanceFilter from "../../components/purchase/performance/SupplierPerformanceFilter";
import SupplierPerformanceTable from "../../components/purchase/performance/SupplierPerformanceTable";
import { supplierPerformanceData } from "../../constants/supplierPerformanceData";

const SupplierPerformance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [supplier, setSupplier] = useState("All Suppliers");

  const filteredData = useMemo(() => {
    return supplierPerformanceData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.initials.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSupplier =
        supplier === "All Suppliers" || item.name === supplier;

      // In a real app, dateRange would filter by item.lastPurchase
      return matchesSearch && matchesSupplier;
    });
  }, [searchTerm, supplier]);

  return (
    <div className="flex-1 bg-[#F7F8FC] p-4 md:p-8 overflow-y-auto min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <SupplierPerformanceFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          supplier={supplier}
          onSupplierChange={setSupplier}
        />
        <SupplierPerformanceTable data={filteredData} />
      </div>
    </div>
  );
};

export default SupplierPerformance;
