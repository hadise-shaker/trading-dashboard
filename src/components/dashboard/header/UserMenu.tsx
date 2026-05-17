"use client";

import { LogOut } from "lucide-react";

type Props = { userName: string };

export default function UserMenu({ userName }: Props) {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/auth";
  };

  const initials = userName.slice(0, 2).toUpperCase();

  return (
    <div
      className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 bg-(--card) border border-(--border)"
    >
      <div
        className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 bg-linear-to-br from-blue-500 to-indigo-500"
      >
        {initials}
      </div>
      <span className="text-[13px] font-medium text-foreground">
        {userName}
      </span>
      <button
        onClick={handleLogout}
        className="ml-1 flex items-center border-none bg-transparent p-0 transition-colors text-(--muted)"
        title="Logout"
      >
        <LogOut size={14} />
      </button>
    </div>
  );
}
