import { Provider } from "react-redux";

import { FileUpload } from "@/components/FileUpload";
import { PackageVisualizer } from "@/components/PackageVisualizer";
import { store } from "@/lib/store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col items-center justify-center min-h-svh p-8">
        <FileUpload />
        <div className="mt-8 w-full max-w-2xl">
          <PackageVisualizer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
