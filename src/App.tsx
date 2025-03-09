import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles"

// Components
import AppLayout from "./components/AppLayout"
import WebVitalsReport from "./components/WebVitalsReport"

// Pages
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import NotFound from "./pages/NotFound"

const theme = createTheme({
    palette: {
        primary: {
            main: "#FFF", // White
            dark: "#0A1014", // Dark
            light: "#353F4C", // Mid Grey
        },
        secondary: {
            main: "#000", // Black
            dark: "#1B2329", // Grey
            light: "#7A8C99", // Light Grey
        },
        success: {
            main: "#2EC4B6", // Green
        },
        error: {
            main: "#FF4040", // Red
        },
        warning: {
            main: "#FF9F1C", // Yellow
        },
    },
})

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <AppLayout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/movies/:movieId"
                                element={<Movies />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </AppLayout>
                    <WebVitalsReport />
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
