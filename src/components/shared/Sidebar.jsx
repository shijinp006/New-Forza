import { NavLink, useLocation } from "react-router";
import { ChevronRight, X } from "lucide-react";

import sidebarLogo from "../../assets/sidebarLogo.svg";
import logotext from "../../assets/logoText.svg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  sidebarPrimaryNav,
  sidebarSecondaryNav,
} from "../../constants/navigationConstants";

const iconStroke = 1.5;
const iconSize = 24;

const navItemBase =
  "group flex w-full items-center rounded-xl font-medium text-[15px] leading-tight tracking-[-0.01em] transition-[color,background-color,box-shadow] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const navInactive =
  "text-[#8E8E93] hover:bg-slate-50/90 hover:text-[#64748B] active:bg-slate-100/80";

const navActive =
  "bg-gradient-to-tr from-[#DCE4FF] via-[#6F57DE]/80 to-[#DCE4FF]  text-white  shadow-[0_8px_30px_rgba(111,87,222,0.18)] backdrop-blur-[9px]";

function NavItem({ item, sidebarOpen, onItemClick }) {
  const Icon = item.icon;

  return (
    <NavLink to={item.to} end={item.end} onClick={onItemClick}>
      {() => {
        const { pathname } = useLocation();
        const allNavItems = [...sidebarPrimaryNav, ...sidebarSecondaryNav];
        const isDashboard = item.to === "/dashboard";

        const isOtherItemMatched = allNavItems
          .filter((i) => i.to !== "/dashboard")
          .some((i) => pathname.startsWith(i.to));

        const isActive = isDashboard
          ? pathname.startsWith("/dashboard") && !isOtherItemMatched
          : pathname.startsWith(item.to);

        return (
          <div
            className={
              isActive
                ? "bg-linear-to-b from-[#DCE4FF]/50 via-[#5949BE] to-[#DCE4FF]/50 p-[2px] border border-[#DCE4FF] rounded-2xl"
                : ""
            }
          >
            <div
              title={!sidebarOpen ? item.title : undefined}
              className={[
                navItemBase,
                sidebarOpen
                  ? "min-h-[44px] gap-3 px-3 py-2.5"
                  : "mx-auto min-h-[44px] w-11 max-w-full justify-center px-0 py-2.5",
                isActive ? navActive : navInactive,
                "rounded-2xl",
              ].join(" ")}
            >
              <Icon
                size={iconSize}
                strokeWidth={iconStroke}
                className={`shrink-0 ${
                  isActive ? "text-white" : "text-current"
                }`}
                aria-hidden
              />

              {sidebarOpen ? (
                <span className="min-w-0 flex-1 truncate font-poppins text-[14px] font-medium text-left">
                  {item.title}
                </span>
              ) : null}
            </div>
          </div>
        );
      }}
    </NavLink>
  );
}

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  mobileOpen,
  setMobileOpen,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen ? setMobileOpen(false) : null}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar Drawer (< lg) */}
      <div
        className={`fixed inset-y-0 left-0 z-[51] flex h-screen w-64 flex-col gap-1.75 gap-y-5.5 rounded-r-[16px] bg-white py-4 px-4 shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
      >
        {/* Mobile Header section */}
        <div className="relative flex h-fit w-full shrink-0 flex-row items-center justify-between p-0">
          <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center">
            <img src={sidebarLogo} alt="Logo" className="h-[50px] w-[50px]" />
          </div>
          <div className="flex flex-1 justify-center">
            <img src={logotext} alt="FORZA" className="h-[26px] w-[110px]" />
          </div>
          <button
            type="button"
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav
          className="mt-1 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden pb-2 pt-1"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {sidebarPrimaryNav.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                sidebarOpen={true}
                onItemClick={() => setMobileOpen(false)}
              />
            ))}
          </div>

          <div className="my-3 h-px shrink-0 bg-[#E8E8E8] mx-0.5" role="separator" />

          <div className="flex flex-col gap-1">
            {sidebarSecondaryNav.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                sidebarOpen={true}
                onItemClick={() => setMobileOpen(false)}
              />
            ))}
          </div>
        </nav>

        {/* Mobile User Account Footer */}
        <div className="shrink-0 border-t border-[#E8E8E8] pt-3">
          <NavLink
            to="/dashboard/account"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              [
                "flex w-full items-center gap-3 px-1 rounded-xl py-2 transition-colors hover:bg-slate-50/90",
                isActive ? "bg-slate-50/80" : "",
              ].join(" ")
            }
          >
            <div
              className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#DDD6FE] to-[#8B5CF6] font-semibold text-white ring-2 ring-white text-[13px]"
              aria-hidden
            >
              AD
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-[11px] font-medium leading-tight text-[#9CA3AF]">
                Great to see you!
              </p>
              <p className="mt-0.5 truncate text-[14px] font-semibold leading-tight text-[#1F2937]">
                Angel Delulu
              </p>
            </div>
            <ChevronRight
              className="h-5 w-5 shrink-0 text-[#C4C4C4]"
              strokeWidth={2}
              aria-hidden
            />
          </NavLink>
        </div>
      </div>

      {/* Desktop Sidebar (>= lg) - Unchanged Design */}
      <div
        className={`hidden lg:flex fixed z-50 left-0 top-0 h-screen flex-col gap-1.75 gap-y-5.5 rounded-r-[16px] bg-white py-4 shadow-[20px_-2px_44px_0px_rgba(0,52,173,0.10),178px_-18px_107px_0px_rgba(0,52,173,0.05)] transition-all duration-300 ${
          sidebarOpen ? "w-64 px-4" : "w-20 px-2"
        }`}
      >
        {/* logo section  */}
        <div className="relative flex h-fit w-full shrink-0 flex-row items-center justify-between p-0 transition-all duration-500">
          <div className="flex h-[66px] w-[66px] shrink-0 items-center justify-center">
            <img src={sidebarLogo} alt="" className="h-[66px] w-[66px]" />
          </div>
          <div
            className={`overflow-hidden bg-white transition-all duration-500 ${
              sidebarOpen
                ? "flex w-fit flex-1 justify-end pr-4"
                : "hidden w-0 p-0"
            }`}
          >
            <img src={logotext} alt="FORZA" className="h-[30px] w-[128px]" />
          </div>

          <button
            type="button"
            aria-expanded={sidebarOpen}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className={`absolute z-[999] top-1/2 flex h-5.5 w-5.5 -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#081021] transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 ${
              sidebarOpen ? "-right-7" : "-right-5.5 rotate-180"
            }`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>

        <nav
          className="mt-1 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden pb-2 pt-1"
          aria-label="Main navigation"
        >
          <div className="flex flex-col gap-1">
            {sidebarPrimaryNav.map((item) => (
              <NavItem key={item.id} item={item} sidebarOpen={sidebarOpen} />
            ))}
          </div>

          <div
            className={`my-3 h-px shrink-0 bg-[#E8E8E8] ${
              sidebarOpen ? "mx-0.5" : "mx-1"
            }`}
            role="separator"
          />

          <div className="flex flex-col gap-1">
            {sidebarSecondaryNav.map((item) => (
              <NavItem key={item.id} item={item} sidebarOpen={sidebarOpen} />
            ))}
          </div>
        </nav>

        <div className="shrink-0 border-t border-[#E8E8E8] pt-3">
          <NavLink
            to="/dashboard/account"
            title={!sidebarOpen ? "Account" : undefined}
            className={({ isActive }) =>
              [
                "flex w-full items-center rounded-xl py-2 transition-colors hover:bg-slate-50/90",
                sidebarOpen ? "gap-3 px-1" : "justify-center px-0",
                isActive ? "bg-slate-50/80" : "",
              ].join(" ")
            }
          >
            <div
              className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#DDD6FE] to-[#8B5CF6] font-semibold text-white ring-2 ring-white ${
                sidebarOpen ? "h-10 w-10 text-[13px]" : "h-9 w-9 text-[12px]"
              }`}
              aria-hidden
            >
              AD
            </div>
            <div
              className={`min-w-0 flex-1 text-left ${
                sidebarOpen ? "" : "sr-only"
              }`}
            >
              <p className="text-[11px] font-medium leading-tight text-[#9CA3AF]">
                Great to see you!
              </p>
              <p className="mt-0.5 truncate text-[14px] font-semibold leading-tight text-[#1F2937]">
                Angel Delulu
              </p>
            </div>
            {sidebarOpen ? (
              <ChevronRight
                className="h-5 w-5 shrink-0 text-[#C4C4C4]"
                strokeWidth={2}
                aria-hidden
              />
            ) : null}
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
