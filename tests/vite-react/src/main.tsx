import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createReactQueryClient } from "@tsdl/react-query";
import type { Router } from "@tsdl/test-server";
import { NextUIProvider } from "@nextui-org/react";
import "./style.css";
import { createTheme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

const darkTheme = createTheme({
  type: "dark",
  theme: {},
});

const queryClient = new QueryClient();
export const tsdl = createReactQueryClient<Router>(
  (url) => fetch(url("http://localhost:8000/tsdl")).then((d) => d.json()),
  queryClient
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NextThemesProvider
      defaultTheme="dark"
      attribute="class"
      value={{
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <App />
        </QueryClientProvider>
      </NextUIProvider>
    </NextThemesProvider>
  </React.StrictMode>
);
