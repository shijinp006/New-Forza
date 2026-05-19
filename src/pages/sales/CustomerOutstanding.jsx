import React, { useState, useMemo } from "react";
import OutstandingFilter from "../../components/sales/outstanding/OutstandingFilter";
import OutstandingTable from "../../components/sales/outstanding/OutstandingTable";
import { customerOutstandingData } from "../../constants/outstandingData";

const CustomerOutstanding = () => {
  const [filters, setFilters] = useState({
    status: "All Statuses",
    age: "All Ages",
    limitType: "All",
  });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = useMemo(() => {
    return customerOutstandingData.filter((item) => {
      const matchesStatus =
        filters.status === "All Statuses" ||
        (filters.status === "Exceeded" && item.status.includes("Exceeded")) ||
        (filters.status === "Within Limit" && item.status === "Within Limit");

      const matchesAge =
        filters.age === "All Ages" ||
        (filters.age === "0-30 Days" && item.age <= 30) ||
        (filters.age === "31-60 Days" && item.age > 30 && item.age <= 60) ||
        (filters.age === "60+ Days" && item.age > 60);

      const matchesLimit =
        filters.limitType === "All" || item.limitType === filters.limitType;

      return matchesStatus && matchesAge && matchesLimit;
    });
  }, [filters]);

  return (
    <div className="flex-1 bg-[#F7F8FC] p-4 md:p-8 overflow-y-auto min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <OutstandingFilter
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <OutstandingTable data={filteredData} />
      </div>
    </div>
  );
};

export default CustomerOutstanding;
