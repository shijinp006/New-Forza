

import TaxSummaryCards from "../../components/tax/TaxSummaryCards";
import TaxCategoryTable from "../../components/tax/TaxCategoryTable";
import { taxCategoryRows, taxSummaryCards } from "../../constants/taxPageData";

const inter = { fontFamily: "Inter, sans-serif" };

const Tax = () => {
  return (
    <main className="min-h-[calc(100vh-100px)] w-full bg-[#F7F8FC] px-4 sm:px-8 pb-8 pt-4">
      <div className="w-full flex flex-col">
        <h1 style={{ ...inter, fontWeight: 700, fontSize: "22px" }} className="text-slate-900">
          Tax Statement
        </h1>

        <div className="mt-4">
          <TaxSummaryCards cards={taxSummaryCards} />
        </div>

        <div className="mt-5">
          <TaxCategoryTable rows={taxCategoryRows} />
        </div>
      </div>
    </main>
  );
};

export default Tax;