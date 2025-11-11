import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./route-tree.gen";
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
const queryClient = new QueryClient();
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
           
                <QueryClientProvider client={queryClient}>
                        <ThemeProvider
                            defaultTheme="dark"
                            storageKey="vite-ui-theme"
                        >
                            <RouterProvider router={router} />
                            <Toaster />
                        </ThemeProvider>
                </QueryClientProvider>
        </StrictMode>,
    );
}
