import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: "build",
    },
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                exportType: "named",
                ref: true,
                svgo: false,
                titleProp: true,
            },
            include: "**/*.svg",
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000,
    },
})
