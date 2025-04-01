import { FileUpload } from "@/components/FileUpload";
import { PackageVisualizer } from "@/components/PackageVisualizer";
import { useAppSelector } from "@/lib/store/store";

import { Header } from "./components/Header";
import { selectPackageJson } from "./lib/store/packageSlice";

function App() {
  const packageJson = useAppSelector(selectPackageJson);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow overflow-hidden">
        {packageJson ? <PackageVisualizer /> : <FileUpload />}
      </div>
    </div>
  );
}

export default App;
