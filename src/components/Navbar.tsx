"use client";

import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div className={`flex flex-col transition-all ${open ? "w-64" : "w-16"}`}>
      
      <button onClick={() => setOpen(prev => !prev)}>
        Toggle
      </button>

      {open && (
        <ul>
          <li>Dashboard</li>
          <li>Positions</li>
          <li>Market</li>
        </ul>
      )}

    </div>
  );
}