

import KpiRow from "../components/account/KpiRow";
import SalesSummary from "../components/account/SalesSummary";
import JournalSummary from "../components/account/JournalSummary";
import CustomerAccounts from "../components/account/CustomerAccounts";
import {
  accountsKpis,
  customerAccounts,
  journalSummaryRows,
  journalTotals,
  salesSummaryRows,
  salesSummaryTotal,
} from "../constants/accountPageData";

const inter = { fontFamily: "Inter, sans-serif" };

const Account = () => {
  return (
    <main className="min-h-[calc(100vh-72px)] w-full bg-[#F7F8FC] px-4 sm:px-8 pb-8 pt-4">
      <div className="w-full flex flex-col">
        <h1 style={{ ...inter, fontWeight: 700, fontSize: "22px" }} className="text-slate-900">
          Accounts
        </h1>

        <div className="mt-4">
          <KpiRow items={accountsKpis} />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <SalesSummary rows={salesSummaryRows} total={salesSummaryTotal} />
          <JournalSummary rows={journalSummaryRows} totals={journalTotals} />
        </div>

        <div className="mt-5">
          <CustomerAccounts rows={customerAccounts} />
        </div>
      </div>
    </main>
  );
};

export default Account;