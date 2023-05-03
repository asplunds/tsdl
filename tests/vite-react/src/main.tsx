import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createReactQueryClient } from "@tsdl/react-query";
import type { Router } from "@tsdl/test-server";

const queryClient = new QueryClient();
export const tsdl = createReactQueryClient<Router>(
  (url) => fetch(url("http://localhost:8000/tsdl")).then((d) => d.json()),
  queryClient
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
