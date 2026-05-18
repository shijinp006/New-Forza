/**
 * Tax Report page.
 *
 * Pattern is intentionally same as Accounts:
 * - data in constants
 * - visual blocks as small components
 * - page composes sections only
 */

import TaxSummaryCards from "../components/tax/TaxSummaryCards";
import TaxCategoryTable from "../components/tax/TaxCategoryTable";
import { taxCategoryRows, taxSummaryCards } from "../constants/taxPageData";

const Tax = () => {
  return (
    <main className="min-h-[calc(100vh-100px)] w-full bg-[#F7F8FC] px-6 pb-8 pt-5">
      <div className="mx-auto w-full max-w-[1200px]">
        <h1 className="text-[24px] font-extrabold tracking-[-0.02em] text-[#0F172A]">
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