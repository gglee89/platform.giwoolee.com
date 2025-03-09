/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "happy-dom",
        setupFiles: "./src/setupTests.ts",
        css: true,
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
        },
        deps: {
            optimizer: {
                web: {
                    include: ["vitest"],
                },
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
