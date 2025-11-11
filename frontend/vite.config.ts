import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import commonjs from "vite-plugin-commonjs";
import checker from "vite-plugin-checker";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

const rootDir = resolve(__dirname, "..");

export default defineConfig(() => {
    return {
        plugins: [
            react(),
            commonjs(),
            checker({
                typescript: {},
            }),
            tailwindcss(),
            tanstackRouter({
                target: "react",
                autoCodeSplitting: true,
                routesDirectory: "./src/pages",
                generatedRouteTree: "./src/route-tree.gen.ts",
                routeFileIgnorePrefix: "-",
                routeToken: "layout",
            }),
        ],
        build: {
            outDir: "build",
        },
        resolve: {
            alias: {
                "@": resolve(__dirname, "./src"),
                "@global-types": resolve(rootDir, "./types/dist"),
            },
        },
    
    };
});
