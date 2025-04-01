import { LogOut } from "lucide-react";

import { Button } from "./ui/button";

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
        <Button
          variant={activeTab === "overview" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onTabChange("overview")}
        >
          Overview
        </Button>
        <Button
          variant={activeTab === "dependencies" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onTabChange("dependencies")}
        >
          Dependencies
        </Button>
        <Button
          variant={activeTab === "devDependencies" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onTabChange("devDependencies")}
        >
          Dev Dependencies
        </Button>
        <Button
          variant={activeTab === "rawInfo" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onTabChange("rawInfo")}
        >
          Raw Info
        </Button>
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
