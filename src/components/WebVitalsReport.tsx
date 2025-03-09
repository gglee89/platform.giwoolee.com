import React, { useState, useEffect, useRef } from "react"
import { onCLS, onINP, onFCP, onLCP, onTTFB } from "web-vitals"
import { Box, Paper, Typography, IconButton, Collapse } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import Draggable from "react-draggable"

interface Metric {
    name: string
    value: number
    rating: "good" | "needs-improvement" | "poor"
}

const WebVitalsReport: React.FC = () => {
    const [metrics, setMetrics] = useState<Metric[]>([])
    const [expanded, setExpanded] = useState(true)
    const theme = useTheme()
    const nodeRef = useRef(null)

    const getRating = (
        name: string,
        value: number
    ): "good" | "needs-improvement" | "poor" => {
        const thresholds = {
            CLS: { good: 0.1, poor: 0.25 },
            INP: { good: 200, poor: 500 },
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
        onCLS((metric) => {
            setMetrics((prev) => [
                ...prev.filter((m) => m.name !== "CLS"),
                {
                    name: "CLS",
                    value: metric.value,
                    rating: getRating("CLS", metric.value),
                },
            ])
        })
        onINP((metric) => {
            setMetrics((prev) => [
                ...prev.filter((m) => m.name !== "INP"),
                {
                    name: "INP",
                    value: metric.value,
                    rating: getRating("INP", metric.value),
                },
            ])
        })
        onFCP((metric) => {
            setMetrics((prev) => [
                ...prev.filter((m) => m.name !== "FCP"),
                {
                    name: "FCP",
                    value: metric.value,
                    rating: getRating("FCP", metric.value),
                },
            ])
        })
        onLCP((metric) => {
            setMetrics((prev) => [
                ...prev.filter((m) => m.name !== "LCP"),
                {
                    name: "LCP",
                    value: metric.value,
                    rating: getRating("LCP", metric.value),
                },
            ])
        })
        onTTFB((metric) => {
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
        <Draggable handle=".drag-handle" bounds="parent" nodeRef={nodeRef}>
            <Paper
                ref={nodeRef}
                elevation={3}
                sx={{
                    position: "fixed",
                    bottom: 20,
                    left: 20,
                    backgroundColor: theme.palette.secondary.dark,
                    color: theme.palette.primary.main,
                    minWidth: 200,
                    zIndex: 9999,
                    cursor: "auto",
                }}
            >
                <Box
                    className="drag-handle"
                    sx={{
                        p: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "move",
                        "&:hover": {
                            backgroundColor: theme.palette.secondary.light,
                            opacity: 0.8,
                        },
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <DragIndicatorIcon fontSize="small" />
                        <Typography variant="subtitle2">Web Vitals</Typography>
                    </Box>
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
                                            color: getColorByRating(
                                                metric.rating
                                            ),
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
        </Draggable>
    )
}

export default WebVitalsReport
