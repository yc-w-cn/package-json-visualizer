interface NpmPackageInfo {
  _id?: string;
  _rev?: string;
  name?: string;
  "dist-tags"?: Record<string, string>;
  versions?: Record<
    string,
    {
      name: string;
      version: string;
      description?: string;
      main?: string;
      bin?: Record<string, string>;
      scripts?: Record<string, string>;
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      maintainers?: Array<{ name: string; email?: string }>;
      dist?: {
        shasum?: string;
        tarball?: string;
        integrity?: string;
        signatures?: Array<{ sig: string; keyid: string }>;
      };
    }
  >;
  downloads?: number;
  maintainers?: Array<{ name: string; email?: string }>;
  lastPublish?: string;
  time?: Record<string, string>;
  description?: string;
}

export type { NpmPackageInfo };
