import React, { useState, useEffect } from "react"
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals"
import { Box, Paper, Typography, IconButton, Collapse } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

interface Metric {
    name: string
    value: number
    rating: "good" | "needs-improvement" | "poor"
}

const WebVitalsReport: React.FC = () => {
    const [metrics, setMetrics] = useState<Metric[]>([])
    const [expanded, setExpanded] = useState(true)
    const theme = useTheme()

    const getRating = (
        name: string,
        value: number
    ): "good" | "needs-improvement" | "poor" => {
        const thresholds = {
            CLS: { good: 0.1, poor: 0.25 },
            FID: { good: 100, poor: 300 },
            FCP: { good: 1800, poor: 3000 },
            LCP: { good: 2500, poor: 4000 },
            TTFB: { good: 800, poor: 1800 },
        }

        const metric = name as keyof typeof thresholds
        if (value <= thresholds[metric].good) return "good"
        if (value >= thresholds[metric].poor) return "poor"
        return "needs-improvement"
    }

    const getColorByRating = (
        rating: "good" | "needs-improvement" | "poor"
    ) => {
        switch (rating) {
            case "good":
                return theme.palette.success.main
            case "needs-improvement":
                return theme.palette.warning.main
            case "poor":
                return theme.palette.error.main
        }
    }

    useEffect(() => {
        getCLS((metric) => {
            setMetrics((prev) => [
                ...prev.filter((m) => m.name !== "CLS"),
                {
                    name: "CLS",
                    value: metric.value,
                    rating: getRating("CLS", metric.value),
                },
            ])
        })
        getFID((metric) => {
            setMetrics((prev) => [
                ...prev.filter((m) => m.name !== "FID"),
                {
                    name: "FID",
                    value: metric.value,
                    rating: getRating("FID", metric.value),
                },
            ])
        })
        getFCP((metric) => {
            setMetrics((prev) => [
                ...prev.filter((m) => m.name !== "FCP"),
                {
                    name: "FCP",
                    value: metric.value,
                    rating: getRating("FCP", metric.value),
                },
            ])
        })
        getLCP((metric) => {
            setMetrics((prev) => [
                ...prev.filter((m) => m.name !== "LCP"),
                {
                    name: "LCP",
                    value: metric.value,
                    rating: getRating("LCP", metric.value),
                },
            ])
        })
        getTTFB((metric) => {
            setMetrics((prev) => [
                ...prev.filter((m) => m.name !== "TTFB"),
                {
                    name: "TTFB",
                    value: metric.value,
                    rating: getRating("TTFB", metric.value),
                },
            ])
        })
    }, [])

    return (
        <Paper
            elevation={3}
            sx={{
                position: "fixed",
                bottom: 20,
                left: 20,
                backgroundColor: theme.palette.secondary.dark,
                color: theme.palette.primary.main,
                minWidth: 200,
                zIndex: 9999,
            }}
        >
            <Box
                sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="subtitle2">Web Vitals</Typography>
                <IconButton
                    size="small"
                    onClick={() => setExpanded(!expanded)}
                    sx={{ color: theme.palette.primary.main }}
                >
                    {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </Box>
            <Collapse in={expanded}>
                <Box sx={{ p: 1 }}>
                    {metrics.map((metric) => (
                        <Box key={metric.name} sx={{ mb: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>{metric.name}:</span>
                                <span
                                    style={{
                                        color: getColorByRating(metric.rating),
                                    }}
                                >
                                    {metric.value.toFixed(2)}
                                </span>
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Collapse>
        </Paper>
    )
}

export default WebVitalsReport
