import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Components
import Search from "../../components/Search"
import CardBox from "../../components/CardBox"

// Actions
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchMovies, getMovies } from "../../features/movies/moviesSlice"

// MUI
import { Box, Grid, CircularProgress, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

// Assets
import EmptyStateImage from "../../assets/illustrations/illustration-empty-state-min.png"

const Home: React.FC = () => {
    const [searchKey, setSearchKey] = useState("")
    const { loading, data: movies } = useAppSelector(getMovies)
    const theme = useTheme()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchMovies({ s: searchKey }))
    }, [dispatch, searchKey])

    return (
        <React.Fragment>
            <Search searchKey={searchKey} updateSearchKey={setSearchKey} />
            {!movies ? (
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
                    <img src={EmptyStateImage} alt="Empty state" />
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
            ) : loading ? (
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
            ) : (
                <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    {movies
                        .filter((item) => item.Type === "movie")
                        .map(({ Title, Year, Poster, imdbID, Type }, idx) => {
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
                        })}
                </Grid>
            )}
        </React.Fragment>
    )
}

export default Home
