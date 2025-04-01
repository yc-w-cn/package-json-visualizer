import dayjs from "dayjs";

import { useAppSelector } from "@/lib/store/store";

type DependencyCardProps = {
  name: string;
  version: string;
};

export function DependencyCard({ name, version }: DependencyCardProps) {
  const npmInfo = useAppSelector((state) => state.npmInfo.data[name]);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium">{name}</h4>

          {npmInfo?.description && (
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
              {npmInfo?.description}
            </div>
          )}
          {npmInfo?.time?.modified && (
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400"></div>
          )}
          <div className="flex gap-1 mt-2">
            <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300">
              {version}
            </span>
            {npmInfo?.time?.modified && (
              <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300">
                {dayjs(npmInfo.time.modified).format("YYYY-MM-DD")}
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <a
            href={`https://www.npmjs.com/package/${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#CB3837] hover:text-[#E53935] font-medium"
          >
            NPM
          </a>
        </div>
      </div>
    </div>
  );
}
