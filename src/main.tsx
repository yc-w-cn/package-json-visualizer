import "./index.css";

import { StrictMode } from "react";

import { ThemeProvider } from "next-themes";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "@/lib/store/store";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
