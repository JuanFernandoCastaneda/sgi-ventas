import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Routing } from "./Routing.tsx";
import { BrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/tanstack/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routing />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
