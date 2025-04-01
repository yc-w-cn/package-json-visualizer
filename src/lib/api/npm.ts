import type { PackageJson } from "@/lib/store/packageSlice";
import type { NpmPackageInfo } from "@/lib/types/npm";

export async function fetchNpmPackageInfo(
  packageName: string,
): Promise<NpmPackageInfo> {
  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch npm info for ${packageName}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error fetching npm info for ${packageName}:`, error);
    return {};
  }
}

export async function updatePackageWithNpmInfo(
  packageJson: PackageJson,
): Promise<Record<string, NpmPackageInfo>> {
  if (!packageJson.dependencies && !packageJson.devDependencies) {
    return {};
  }

  const allDeps = [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.devDependencies || {}),
  ];

  const npmInfo: Record<string, NpmPackageInfo> = {};

  for (const dep of allDeps) {
    npmInfo[dep] = await fetchNpmPackageInfo(dep);
  }

  return npmInfo;
}
