import { Button } from "@/components/ui/button";
import {
  selectDependencies,
  selectDevDependencies,
  selectPackageJson,
} from "@/lib/store/packageSlice";
import { useAppSelector } from "@/lib/store/store";

export function PackageVisualizer() {
  const packageJson = useAppSelector(selectPackageJson);
  const dependencies = useAppSelector(selectDependencies);
  const devDependencies = useAppSelector(selectDevDependencies);

  const handleInstall = (type: "dependencies" | "devDependencies") => {
    if (!packageJson) return;

    const packages =
      type === "dependencies"
        ? packageJson.dependencies
        : packageJson.devDependencies;

    if (!packages) return;

    const packageList = Object.entries(packages)
      .map(([name, version]) => `${name}@${version}`)
      .join(" ");

    // 这里可以添加实际的安装逻辑
    console.log(`Installing ${type}: ${packageList}`);
  };

  if (!packageJson) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">
          {packageJson.name || "Unnamed Package"}
        </h2>
        <p className="text-sm text-gray-500">
          Version: {packageJson.version || "Not specified"}
        </p>
      </div>

      {dependencies.length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Dependencies</h3>
            <Button size="sm" onClick={() => handleInstall("dependencies")}>
              Install All
            </Button>
          </div>
          <ul className="mt-2 space-y-1">
            {dependencies.map((dep) => (
              <li key={dep} className="text-sm">
                {dep}: {packageJson.dependencies?.[dep] ?? "Not specified"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {devDependencies.length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Dev Dependencies</h3>
            <Button size="sm" onClick={() => handleInstall("devDependencies")}>
              Install All
            </Button>
          </div>
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
  );
}
