import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import logo from "@/assets/logo.svg";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="mx-4 flex items-center">
          <div className="mr-6 flex items-center space-x-2">
            <img
              src={logo}
              alt="Logo"
              className="h-6 w-6 dark:brightness-200"
            />
            <span className="font-bold">Package Analyzer</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end px-4 space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-6 w-6"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 stroke-[2.5]" />
            ) : (
              <Moon className="h-5 w-5 stroke-[2.5]" />
            )}
          </Button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="h-5 w-5 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" />
          </a>
        </div>
      </div>
    </header>
  );
}
