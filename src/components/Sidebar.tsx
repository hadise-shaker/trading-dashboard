"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, LineChart, TrendingUp,
  History, Settings, ChevronLeft, ChevronRight,
  Moon, Sun,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Positions",  icon: LineChart,       href: "/dashboard/positions" },
  { label: "Market",     icon: TrendingUp,      href: "/dashboard/market" },
  { label: "History",    icon: History,         href: "/dashboard/history" },
  { label: "Settings",   icon: Settings,        href: "/dashboard/settings" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 overflow-hidden transition-all duration-250 ease-in-out shrink-0 border-r border-(--border) bg-(--sidebar-bg)"
      style={{ width: open ? 200 : 64, minWidth: open ? 200 : 64 }}
    >
      {/* Logo + toggle */}
      <div className="flex items-center justify-between shrink-0 h-16 px-3 border-b border-(--border)">
        {open ? (
          <div className="flex items-center">
            <span className="text-xl font-extrabold tracking-tight text-foreground">HF</span>
            <span className="text-xl font-extrabold tracking-tight text-red-500">M</span>
          </div>
        ) : (
          <div className="flex-1 flex justify-center">
            <span className="text-xl font-extrabold text-red-500">M</span>
          </div>
        )}
        <button
          onClick={() => setOpen((p) => !p)}
          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 border border-(--border) bg-transparent text-(--muted)"
        >
          {open ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 p-2">
        {navItems.map(({ label, icon: Icon, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center rounded-lg text-sm font-medium
                transition-all duration-150 no-underline shrink-0
                border-r-2
                ${open ? "gap-2.5 px-3 py-2.5" : "justify-center py-2.5"}
                ${active
                  ? "text-(--accent) bg-(--accent-dim) border-(--accent)"
                  : "text-(--text) bg-transparent border-transparent"
                }
              `}
            >
              <Icon size={17} className="shrink-0" />
              {open && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Theme toggle */}
      <div className={`flex items-center gap-2.5 border-t border-(--border) ${open ? "px-4 py-4" : "py-4 justify-center"}`}>
        {isDark
          ? <Moon size={15} className="text-(--muted) shrink-0" />
          : <Sun  size={15} className="text-(--muted) shrink-0" />
        }
        {open && (
          <>
            <span className="text-xs text-(--text)">
              {isDark ? "Dark Mode" : "Light Mode"}
            </span>
            <button
              onClick={toggleTheme}
              className="ml-auto w-8 h-[18px] rounded-full relative border-none shrink-0 transition-colors duration-200"
              style={{ background: isDark ? "var(--accent)" : "var(--border)" }}
            >
              <div
                className="absolute top-[3px] w-3 h-3 rounded-full bg-white transition-all duration-200"
                style={{ left: isDark ? 17 : 3 }}
              />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}