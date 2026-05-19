import React from 'react';
import StatCard from '../../components/dashboard/StatCard';
import HourlySalesChart from '../../components/dashboard/HourlySalesChart';
import IncomeExpensesChart from '../../components/dashboard/IncomeExpensesChart';
import PdcCheques from '../../components/dashboard/PdcCheques';
import ProductMovementChart from '../../components/dashboard/ProductMovementChart';
import { statsData } from '../../constants/dashboardData';

/**
 * Dashboard Component
 * Main page for the business overview dashboard.
 * 
 * Organized into sections:

 * 2. Summary Stats (Revenue, Expenses, Profit)
 * 3. Performance Analysis (Hourly Sales and Income/Expenses)
 * 4. Operational Data (PDC Cheques and Product Movement)
 */
const Dashboard = () => {
  return (
    <div className="flex-1 bg-[#F7F8FC] p-4 md:p-8 overflow-y-auto">

      {/* 2. Summary Stats Section */}
      <div className="flex flex-wrap gap-5.5 mb-8">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* 3. Performance Analysis Section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <HourlySalesChart />
        <IncomeExpensesChart />
      </div>

      {/* 4. Operational Data Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <PdcCheques />
        <ProductMovementChart />
      </div>
    </div>
  );
};

export default Dashboard;