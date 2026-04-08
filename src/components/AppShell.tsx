"use client";

import { useState } from "react";
import { Header } from "./Header";
import { DesktopSidebar, MobileSidebar } from "./Sidebar";
import { FrameworkProvider } from "@/context/FrameworkContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <FrameworkProvider>
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <DesktopSidebar />

        <MobileSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
    </FrameworkProvider>
  );
}
