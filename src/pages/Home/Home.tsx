import React, { useState } from "react"
import { Link } from "react-router-dom"

// Components
import Search from "@/components/Search"
import CardBox from "@/components/CardBox"

// MUI
import { Box, Grid, CircularProgress, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

// Assets
import EmptyStateImage from "@/assets/illustrations/illustration-empty-state-min.png"

// Services
import { useMovies } from "@/services/api/api.service"

const Home: React.FC = () => {
    const [searchKey, setSearchKey] = useState("")
    const { data, isLoading, error } = useMovies({ s: searchKey })
    const theme = useTheme()

    if (isLoading)
        return (
            <Box
                sx={{
                    alignItems: "center",
                    color: theme.palette.primary.main,
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
                <Typography
                    variant="subtitle1"
                    color={theme.palette.success.main}
                >
                    Loading...
                </Typography>
            </Box>
        )

    if (error)
        return (
            <Box
                sx={{
                    alignItems: "center",
                    color: theme.palette.primary.main,
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h6" color={theme.palette.primary.main}>
                    Error: {error.message}
                </Typography>
            </Box>
        )

    return (
        <React.Fragment>
            <Search searchKey={searchKey} updateSearchKey={setSearchKey} />
            {!data?.Search ? (
                <Box
                    sx={{
                        alignItems: "center",
                        color: theme.palette.primary.main,
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={EmptyStateImage}
                        alt="Empty state"
                        loading="lazy"
                        style={{
                            backgroundColor: theme.palette.secondary.dark,
                            minHeight: "300px",
                            minWidth: "300px",
                        }}
                    />
                    <Typography variant="h6" color={theme.palette.primary.main}>
                        Don't know what to search?
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color={theme.palette.primary.light}
                    >
                        Here's an offer you can't refuse
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    {data.Search.map(
                        ({ Title, Year, Poster, imdbID, Type }, idx) => {
                            return (
                                <Grid item key={idx} xs={3}>
                                    <Link
                                        to={`/movies/${imdbID}`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <CardBox
                                            Title={Title}
                                            Year={Year}
                                            Poster={
                                                Poster !== "N/A"
                                                    ? Poster
                                                    : `https://fakeimg.pl/200x300`
                                            }
                                            imdbID={imdbID}
                                            Type={Type}
                                        />
                                    </Link>
                                </Grid>
                            )
                        }
                    )}
                </Grid>
            )}
        </React.Fragment>
    )
}

export default Home
