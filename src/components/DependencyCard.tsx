type DependencyCardProps = {
  name: string;
  version: string;
};

export function DependencyCard({ name, version }: DependencyCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium">{name}</h4>
          <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300">
            {version}
          </span>
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
