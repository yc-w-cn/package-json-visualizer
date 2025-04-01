import { PackageJson } from "@/lib/store/packageSlice";

import { DependencyCard } from "./DependencyCard";

type DependenciesListProps = {
  title: string;
  dependencies: string[];
  packageJson: PackageJson;
  dependencyType: "dependencies" | "devDependencies";
};

export function DependenciesList({
  title,
  dependencies,
  packageJson,
  dependencyType,
}: DependenciesListProps) {
  if (dependencies.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {dependencies.map((dep) => (
          <DependencyCard
            key={dep}
            name={dep}
            version={packageJson[dependencyType]?.[dep] ?? "Not specified"}
          />
        ))}
      </div>
    </div>
  );
}
