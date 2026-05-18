import PurchaseSummaryCards from "../components/purchase/PurchaseSummaryCards";
import PurchaseTrendChart from "../components/purchase/PurchaseTrendChart";
import SupplierDuesCard from "../components/purchase/SupplierDuesCard";
import RecentSupplierTable from "../components/purchase/RecentSupplierTable";
import {
  monthlyPurchaseTrend,
  purchaseSummaryCards,
  purchaseTableData,
  supplierDuesBreakdown,
  supplierDuesTotalLabel,
} from "../constants/purchasePageData";

/**
 * Purchase Analysis page.
 * Structure:
 * - KPI cards
 * - Trend + dues charts
 * - Tabbed/paginated supplier table
 */
const Purchase = () => {
  return (
    <main className="min-h-[calc(100vh-100px)] w-full bg-[#F7F8FC] px-6 pb-8 pt-5">
      <div className="mx-auto w-full max-w-[1200px]">
        <h1 className="text-[24px] font-extrabold tracking-[-0.02em] text-[#0F172A]">
          Purchase Analysis
        </h1>

        <div className="mt-4">
          <PurchaseSummaryCards cards={purchaseSummaryCards} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <PurchaseTrendChart rows={monthlyPurchaseTrend} />
          <SupplierDuesCard rows={supplierDuesBreakdown} totalLabel={supplierDuesTotalLabel} />
        </div>

        <div className="mt-4">
          <RecentSupplierTable rowsByTab={purchaseTableData} />
        </div>
      </div>
    </main>
  );
};

export default Purchase;