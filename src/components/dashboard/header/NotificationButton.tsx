import { Bell } from "lucide-react";

export default function NotificationButton() {
  return (
    <button
      className="relative w-[38px] h-[38px] rounded-lg flex items-center justify-center transition-colors border border-(--border) bg-(--card) text-(--text)"
    >
      <Bell size={17} />
      <span
        className="pulse-dot absolute top-2 right-2 w-[7px] h-[7px] rounded-full bg-(--negative)"
      />
    </button>
  );
}
