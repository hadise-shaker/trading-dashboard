"use client";

import NotificationButton from "./NotificationButton";
import UserMenu from "./UserMenu";

type Props = { userName: string; pageTitle?: string; pageSubtitle?: string };

export default function DashboardHeader({
  userName,
  pageTitle = "Dashboard Overview",
  pageSubtitle,
}: Props) {
  return (
    <div
      className="flex items-center justify-between px-6 sticky top-0 z-10 shrink-0 h-16 border-b border-(--border) bg-(--header-bg)"
    >
      <div>
        <h1 className="text-xl font-semibold m-0 tracking-tight text-foreground">
          {pageTitle}
        </h1>
        <p className="text-[13px] m-0 text-(--text)">
          {pageSubtitle ?? `Welcome back, ${userName} 👋`}
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <NotificationButton />
        <UserMenu userName={userName} />
      </div>
    </div>
  );
}
