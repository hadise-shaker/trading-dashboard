"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div className={`flex flex-col transition-all ${open ? "w-64" : "w-16"}`}>
      
      <button onClick={() => setOpen(prev => !prev)}>
        Toggle
      </button>

      {open && (
        <ul>
          <li className={isActive("/dashboard") ? "font-bold" : ""}>
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <li className={isActive("/dashboard/positions") ? "font-bold" : ""}>
            <Link href="/dashboard/positions">Positions</Link>
          </li>

          <li className={isActive("/dashboard/market") ? "font-bold" : ""}>
            <Link href="/dashboard/market">Market</Link>
          </li>
        </ul>
      )}
    </div>
  );
}