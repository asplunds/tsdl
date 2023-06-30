import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./style.css";
import { Toaster } from "react-hot-toast";
import { createReactQueryClient } from "@tsdl/react-query";
import type { Router } from "@tsdl/test-node";

const queryClient = new QueryClient();
export const tsdl = createReactQueryClient<Router>(
  ({ url, options, signal }) =>
    fetch(url("http://localhost:9000/tsdl"), { ...options, signal }).then((d) =>
      d.json()
    ),
  queryClient
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
