"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SidebarType = "cart" | "wishlist" | "filter" | null;

type SidebarContextType = {
  sidebarType: SidebarType;
  openSidebar: (type: SidebarType) => void;
  closeSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebarType, setSidebarType] = useState<SidebarType>(null);

  const openSidebar = (type: SidebarType) => {
    setSidebarType(type);
  };

  const closeSidebar = () => {
    setSidebarType(null);
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarType,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
