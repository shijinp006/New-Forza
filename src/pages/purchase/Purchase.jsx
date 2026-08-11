import PurchaseSummaryCards from "../../components/purchase/PurchaseSummaryCards";
import PurchaseTrendChart from "../../components/purchase/PurchaseTrendChart";
import SupplierDuesCard from "../../components/purchase/SupplierDuesCard";
import RecentSupplierTable from "../../components/purchase/RecentSupplierTable";
import {
  monthlyPurchaseTrend,
  purchaseSummaryCards,
  purchaseTableData,
  supplierDuesBreakdown,
  supplierDuesTotalLabel,
} from "../../constants/purchasePageData";

/**
 * Purchase Analysis page.
 * Structure:
 * - KPI cards
 * - Trend + dues charts
 * - Tabbed/paginated supplier table
 */
const inter = { fontFamily: "Inter, sans-serif" };

const Purchase = () => {
  return (
    <main className="min-h-[calc(100vh-100px)] w-full bg-[#F7F8FC] px-4 sm:px-8 pb-8 pt-4">
      <div className="w-full flex flex-col">
        <h1 style={{ ...inter, fontWeight: 700, fontSize: "22px" }} className="text-slate-900">
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