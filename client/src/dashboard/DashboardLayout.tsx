import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar"; // ✅ import this

const DashboardLayout = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("name");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => setSearchQuery(query);
  const handleSort = (sort: string) => setSortBy(sort);
  const handleViewChange = (v: "grid" | "list") => setView(v);

  return (
    <SidebarProvider> {/* ✅ wrap your entire dashboard */}
      <div className="flex min-h-screen w-full bg-background text-foreground">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <DashboardHeader
            onSearch={handleSearch}
            onSort={handleSort}
            onViewChange={handleViewChange}
            currentView={view}
          />

          {/* Page Content */}
          <main className="flex-1 p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
