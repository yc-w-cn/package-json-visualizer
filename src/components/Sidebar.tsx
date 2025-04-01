import { LogOut } from "lucide-react";

import { Button } from "./ui/button";

function NavButton({
  tab,
  activeTab,
  onTabChange,
  children,
}: {
  tab: SidebarTab;
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={activeTab === tab ? "default" : "ghost"}
      className="w-full justify-start"
      onClick={() => onTabChange(tab)}
    >
      {children}
    </Button>
  );
}

export type SidebarTab =
  | "overview"
  | "dependencies"
  | "devDependencies"
  | "rawInfo";

type SidebarProps = {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  onExit: () => void;
};

export function Sidebar({ activeTab, onTabChange, onExit }: SidebarProps) {
  return (
    <div className="w-48 border-r p-4 flex flex-col justify-between h-full">
      <div className="space-y-2">
        <NavButton
          tab="overview"
          activeTab={activeTab}
          onTabChange={onTabChange}
        >
          Overview
        </NavButton>
        <NavButton
          tab="dependencies"
          activeTab={activeTab}
          onTabChange={onTabChange}
        >
          Dependencies
        </NavButton>
        <NavButton
          tab="devDependencies"
          activeTab={activeTab}
          onTabChange={onTabChange}
        >
          Dev Dependencies
        </NavButton>
        <NavButton
          tab="rawInfo"
          activeTab={activeTab}
          onTabChange={onTabChange}
        >
          Raw Info
        </NavButton>
      </div>
      <div className="pt-4 border-t mt-auto">
        <button
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 w-full text-left"
          onClick={onExit}
        >
          <LogOut className="inline mr-2 h-4 w-4" />
          Exit
        </button>
      </div>
    </div>
  );
}
