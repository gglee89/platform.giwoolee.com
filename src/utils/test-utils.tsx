import React from "react"
import { render } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../App" // You'll need to export the theme from App.tsx
import { vi } from "vitest"
import axios from "axios"

// Mock axios
vi.mock("axios")

export const mockAxios = axios as unknown as {
    get: ReturnType<typeof vi.fn>
    post: ReturnType<typeof vi.fn>
    put: ReturnType<typeof vi.fn>
    delete: ReturnType<typeof vi.fn>
}

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                gcTime: 0,
                staleTime: 0,
            },
        },
    })

interface WrapperProps {
    children: React.ReactNode
}

export function createWrapper() {
    const testQueryClient = createTestQueryClient()
    return ({ children }: WrapperProps) => (
        <QueryClientProvider client={testQueryClient}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>{children}</BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export function renderWithProviders(ui: React.ReactElement) {
    const testQueryClient = createTestQueryClient()
    const Wrapper = ({ children }: WrapperProps) => (
        <QueryClientProvider client={testQueryClient}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>{children}</BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    )

    return {
        ...render(ui, { wrapper: Wrapper }),
        queryClient: testQueryClient,
    }
}

// re-export everything
export * from "@testing-library/react"
