import {
  Bell,
  BookText,
  PieChart,
  Settings,
} from "lucide-react";
import { AiOutlineHome } from "react-icons/ai";
import { GrBasket } from "react-icons/gr";
import DiscountIcon from "../utils/custom icons/DiscountIcon";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { PiHeadsetLight } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";


/** Primary nav — matches `App.jsx` dashboard child routes */
export const sidebarPrimaryNav = [
  {
    id: "dashboard",
    title: "Dashboard",
    to: "/dashboard",
    icon: AiOutlineHome,
  },

  {
    id: "sale",
    title: "Sales Analysis",
    to: "/dashboard/sale",
    icon: PieChart,
  },
  {
    id: "purchase",
    title: "Purchase Analysis",
    to: "/dashboard/purchase",
    icon: GrBasket  ,
  },
  {
    id: "inventory",
    title: "Inventory",
    to: "/dashboard/inventory",
    icon: HiOutlineArchiveBox,
  },
  {
    id: "tax",
    title: "Tax Report",
    to: "/dashboard/tax",
    icon: DiscountIcon,
  },
  {
    id: "account",
    title: "Account report",
    to: "/dashboard/account",
    icon: BookText,
  },
];

/** Secondary nav — Notifications, Settings, Help */
export const sidebarSecondaryNav = [
  {
    id: "notifications",
    title: "Notifications",
    to: "/dashboard/notifications",
    icon: IoNotificationsOutline,
  },
  {
    id: "settings",
    title: "Settings",
    to: "/dashboard/settings",
    icon: Settings,
  },
  {
    id: "help",
    title: "Help",
    to: "/dashboard/help",
    icon: PiHeadsetLight  ,
  },
];
