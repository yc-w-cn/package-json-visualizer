import { useState } from "react";

import {
  clearPackageJson,
  selectDependencies,
  selectDevDependencies,
  selectPackageJson,
} from "@/lib/store/packageSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";

import { DependenciesList } from "./DependenciesList";
import { Sidebar, SidebarTab } from "./Sidebar";

export function PackageVisualizer() {
  const dispatch = useAppDispatch();
  const packageJson = useAppSelector(selectPackageJson);
  const dependencies = useAppSelector(selectDependencies);
  const devDependencies = useAppSelector(selectDevDependencies);
  const [activeTab, setActiveTab] = useState<SidebarTab>("overview");

  const handleExit = () => {
    dispatch(clearPackageJson());
  };

  if (!packageJson) return null;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onExit={handleExit}
      />

      <div className="flex-1 p-6 overflow-auto">
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">
                {packageJson.name || "Unnamed Package"}
              </h2>
              <p className="text-sm text-gray-500">
                Version: {packageJson.version || "Not specified"}
              </p>
            </div>
          </div>
        )}

        {activeTab === "dependencies" && (
          <DependenciesList
            title="Dependencies"
            dependencies={dependencies}
            packageJson={packageJson}
            dependencyType="dependencies"
          />
        )}

        {activeTab === "devDependencies" && (
          <DependenciesList
            title="Dev Dependencies"
            dependencies={devDependencies}
            packageJson={packageJson}
            dependencyType="devDependencies"
          />
        )}
        {activeTab === "rawInfo" && (
          <div>
            <h3 className="text-lg font-medium mb-2">Raw Package Info</h3>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm overflow-auto">
              {JSON.stringify(packageJson, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
