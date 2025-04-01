import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  clearPackageJson,
  selectDependencies,
  selectDevDependencies,
  selectPackageJson,
} from "@/lib/store/packageSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";

export function PackageVisualizer() {
  const dispatch = useAppDispatch();
  const packageJson = useAppSelector(selectPackageJson);
  const dependencies = useAppSelector(selectDependencies);
  const devDependencies = useAppSelector(selectDevDependencies);
  const [activeTab, setActiveTab] = useState<
    "overview" | "dependencies" | "devDependencies"
  >("overview");

  const handleReset = () => {
    dispatch(clearPackageJson());
  };

  if (!packageJson) return null;

  return (
    <div className="flex h-full w-full">
      <div className="w-48 border-r p-4 space-y-2">
        <Button
          variant={activeTab === "overview" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </Button>
        <Button
          variant={activeTab === "dependencies" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("dependencies")}
        >
          Dependencies
        </Button>
        <Button
          variant={activeTab === "devDependencies" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("devDependencies")}
        >
          Dev Dependencies
        </Button>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>

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

            <div>
              <h3 className="text-lg font-medium mb-2">Package Info</h3>
              <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
                {JSON.stringify(packageJson, null, 2)}
              </pre>
            </div>
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">
            {packageJson.name || "Unnamed Package"}
          </h2>
          <p className="text-sm text-gray-500">
            Version: {packageJson.version || "Not specified"}
          </p>
        </div>

        {activeTab === "dependencies" && dependencies.length > 0 && (
          <div>
            <h3 className="text-lg font-medium">Dependencies</h3>
            <ul className="mt-2 space-y-1">
              {dependencies.map((dep) => (
                <li key={dep} className="text-sm">
                  {dep}: {packageJson.dependencies?.[dep] ?? "Not specified"}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "devDependencies" && devDependencies.length > 0 && (
          <div>
            <h3 className="text-lg font-medium">Dev Dependencies</h3>
            <ul className="mt-2 space-y-1">
              {devDependencies.map((dep) => (
                <li key={dep} className="text-sm">
                  {dep}: {packageJson.devDependencies?.[dep] ?? "Not specified"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
