import { useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";

import {
  CalendarDays,
  ChevronLeft,
  Download,
  Filter,
  Menu,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  sidebarPrimaryNav,
  sidebarSecondaryNav,
} from "../../constants/navigationConstants";

const MAIN_HEADER_HEIGHT = "h-[100px]";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function titleFromPath(pathname) {
  const all = [...sidebarPrimaryNav, ...sidebarSecondaryNav];
  const hit = all.find((i) => i.to === pathname);
  if (hit) return hit.title;

  const last = pathname.split("/").filter(Boolean).at(-1) ?? "Page";
  return last.replace(/[-_]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function isMainDashboardPage(pathname) {
  const all = [...sidebarPrimaryNav, ...sidebarSecondaryNav];
  return all.some((i) => i.to === pathname);
}

function MainToolbarHeader({ onMobileMenuToggle }) {
  const headerBaseBackground =
    "linear-gradient(180deg, rgba(89, 73, 190, 0.3) 0%, rgba(205, 119, 255, 0.3) 100%), radial-gradient(63.87% 50% at 52.08% 100%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)";

  return (
    <div className={cx(MAIN_HEADER_HEIGHT, "w-full bg-[#F7F8FC]")}>
      {/* Full-width container matching component horizontal padding px-4 sm:px-8 */}
      <div className="flex h-full w-full items-center px-4 sm:px-8">
        {/* Base div: gradient border effect (padding creates the 1px border) */}
        <div
          className="w-full z-0 rounded-xl p-px shadow-[0px_12px_32.26px_0px_#620DFF30,0px_24px_84.2px_0px_#620DFF57]"
          style={{ background: headerBaseBackground }}
        >
          {/* Purple surface: main gradient + exact outer/inset shadows */}
          <div className="rounded-lg bg-linear-to-b z-40 from-[#5949BE] px-4 py-3 to-[#620DFF] shadow-[inset_0px_1px_4px_2px_#E2D2FF,inset_0px_1px_18px_2px_#EBD2FF] ">
            {/*  toolbar container */}
            <div className="flex h-11 w-full items-center justify-between gap-3 rounded-[12px] bg-transparent">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onMobileMenuToggle}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/30 lg:hidden shrink-0"
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <h2 className="font-inter font-semibold text-lg text-white">
                  Alfuttaim
                </h2>
              </div>

              <button
                type="button"
                className="inline-flex h-8 items-center gap-2 rounded-[8px] bg-white px-3 text-[14px] font-medium text-[#433E3F] hover:bg-[#F8FAFC]"
              >
                <CalendarDays className="h-[20px] w-[20px]" strokeWidth={2} />
                Today
                <SlidersHorizontal
                  className="ml-1 h-[20px] w-[20px]"
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InnerBreadcrumbHeader({ title, onMobileMenuToggle }) {
  const navigate = useNavigate();

  return (
    <div className={cx(MAIN_HEADER_HEIGHT, "w-full bg-white shadow-sm")}>
      <div className="flex h-full w-full items-center gap-3 sm:gap-4 px-4 sm:px-8">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#0F172A] shadow-sm hover:bg-slate-50 lg:hidden shrink-0"
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#EF4444] shadow-sm hover:bg-slate-50 shrink-0"
          aria-label="Go back"
        >
          <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2.5} />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-[#0F172A]">{title}</p>
          <p className="mt-0.5 truncate text-[12px] font-medium text-[#64748B]">
            <NavLink to="/dashboard" className="hover:text-[#4F46E5]">
              Home
            </NavLink>
            <span className="mx-2 text-[#CBD5E1]" aria-hidden>
              |
            </span>
            <span className="text-[#64748B]">{title}</span>
          </p>
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 md:flex">
          <div className="flex w-full max-w-[300px] items-center rounded-[10px] bg-[#F8FAFC] px-3 py-2">
            <Search
              className="h-[18px] w-[18px] text-[#94A3B8]"
              strokeWidth={2}
            />
            <input
              placeholder="Search data..."
              className="ml-2 w-full bg-transparent text-[14px] font-medium text-[#0F172A] placeholder:text-[#94A3B8] outline-none"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white px-4 text-[13px] font-semibold text-[#0F172A] shadow-sm hover:bg-slate-50"
          >
            <Filter className="h-[16px] w-[16px]" strokeWidth={2} />
            Filter
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white px-4 text-[13px] font-semibold text-[#0F172A] shadow-sm hover:bg-slate-50"
          >
            Export
            <Download className="h-[16px] w-[16px]" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

const Header = ({ onMobileMenuToggle }) => {
  const { pathname } = useLocation();

  const variant = useMemo(
    () => (isMainDashboardPage(pathname) ? "main" : "inner"),
    [pathname],
  );
  const title = useMemo(() => titleFromPath(pathname), [pathname]);

  return (
    <header className="sticky top-0  w-full">
      {variant === "main" ? (
        <MainToolbarHeader onMobileMenuToggle={onMobileMenuToggle} />
      ) : (
        <InnerBreadcrumbHeader
          title={title}
          onMobileMenuToggle={onMobileMenuToggle}
        />
      )}
    </header>
  );
};

export default Header;
