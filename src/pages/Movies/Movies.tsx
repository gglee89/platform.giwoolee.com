import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// Actions
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchMovieDetail } from "../../features/movieDetail/movieDetailSlice"

// MUI
import { Box, CircularProgress, Grid, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

// Assets
import EmptyStateImage from "../../assets/illustrations/illustration-empty-state-min.png"
import { ReactComponent as IMDBLogo } from "../../assets/logos/logo-imdb.svg"
import { ReactComponent as RottenTomatoesLogo } from "../../assets/logos/logo-rotten-tomatoes.svg"
import { ReactComponent as HeartIconSVG } from "../../assets/icons/icon-heart-white.svg"

const bull = (
    <Box
        component="span"
        sx={{
            display: "inline-block",
            mx: 1,
            mt: 0.4,
            transform: "scale(0.7)",
        }}
    >
        •
    </Box>
)

const Movies: React.FC = () => {
    const { movieId } = useParams()
    const theme = useTheme()
    const [isFavorite, setIsFavorite] = useState(false)
    const dispatch = useAppDispatch()
    const { loading, data: movieDetail } = useAppSelector(
        (state) => state.movieDetail
    )

    useEffect(() => {
        if (movieId) dispatch(fetchMovieDetail({ i: movieId }))
    }, [dispatch, movieId])

    if (loading) {
        ;<Box
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
            <Typography variant="subtitle1" color={theme.palette.success.main}>
                Loading...
            </Typography>
        </Box>
    }

    if (!movieDetail) {
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
        )
    }

    const {
        Title,
        Year,
        Runtime,
        Rated,
        Poster,
        Ratings,
        Plot,
        Actors,
        Genre,
        Director,
    } = movieDetail

    return (
        <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, md: 2 }}
            sx={{
                flex: 1,
                minHeight: 500,
            }}
        >
            <Grid item alignItems="flex-start" xs={6} mt={4}>
                <Box
                    sx={{
                        color: theme.palette.secondary.light,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        color={theme.palette.secondary.light}
                    >
                        {Runtime}
                    </Typography>
                    {bull}
                    <Typography
                        variant="subtitle1"
                        color={theme.palette.secondary.light}
                    >
                        {Year}
                    </Typography>
                    {bull}
                    <Typography
                        variant="subtitle1"
                        color={theme.palette.secondary.dark}
                        sx={{
                            background: theme.palette.secondary.light,
                            borderRadius: 1,
                            paddingLeft: theme.spacing(0.5),
                            paddingRight: theme.spacing(0.5),
                        }}
                    >
                        {Rated}
                    </Typography>
                </Box>
                <Box mt={theme.spacing(4)}>
                    <Typography
                        color="primary"
                        fontSize={theme.spacing(7)}
                        fontWeight="bold"
                        letterSpacing={theme.spacing(0)}
                        lineHeight={theme.spacing(8)}
                    >
                        {Title}
                    </Typography>
                </Box>
                <Box mt={theme.spacing(4)} display="flex" flexDirection="row">
                    {Ratings.filter((rating) =>
                        ["Internet Movie Database", "Rotten Tomatoes"].includes(
                            rating.Source
                        )
                    ).map(({ Source, Value }) => {
                        const isIMDB = Source === "Internet Movie Database"
                        return (
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="center"
                                mr={theme.spacing(2)}
                                pr={theme.spacing(1)}
                                sx={{
                                    border: `1px solid ${theme.palette.secondary.light}`,
                                    borderTopLeftRadius: 4,
                                    borderBottomLeftRadius: 4,
                                }}
                            >
                                <Box
                                    padding={theme.spacing(1)}
                                    sx={{
                                        borderTopLeftRadius: 4,
                                        borderBottomLeftRadius: 4,
                                        backgroundColor: isIMDB
                                            ? theme.palette.warning.main
                                            : theme.palette.error.main,
                                    }}
                                    mr={theme.spacing(1)}
                                >
                                    {isIMDB ? (
                                        <IMDBLogo
                                            fill={theme.palette.warning.main}
                                        />
                                    ) : (
                                        <RottenTomatoesLogo
                                            fill={theme.palette.error.main}
                                        />
                                    )}
                                </Box>
                                <Typography color="primary" fontSize={14}>
                                    {Value}
                                </Typography>
                            </Box>
                        )
                    })}
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        mr={theme.spacing(2)}
                        pr={theme.spacing(1)}
                        sx={
                            isFavorite
                                ? {
                                      border: `1px solid ${theme.palette.secondary.light}`,
                                      backgroundColor: theme.palette.error.main,
                                      cursor: "pointer",
                                      paddingLeft: theme.spacing(1),
                                  }
                                : {
                                      border: `1px solid ${theme.palette.secondary.light}`,
                                      borderRadius: 4,
                                      "&:hover": {
                                          backgroundColor:
                                              theme.palette.error.main,
                                          cursor: "pointer",
                                      },
                                  }
                        }
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        <>
                            {isFavorite ? (
                                <Typography color="primary" fontSize={14}>
                                    Added
                                </Typography>
                            ) : (
                                <>
                                    <Box
                                        display="flex"
                                        px={theme.spacing(1.5)}
                                        mr={theme.spacing(1)}
                                    >
                                        <HeartIconSVG
                                            width={theme.spacing(2)}
                                        />
                                    </Box>
                                    <Typography color="primary" fontSize={14}>
                                        Add to favourites
                                    </Typography>
                                </>
                            )}
                        </>
                    </Box>
                </Box>
                <Box mt={theme.spacing(4)}>
                    <Typography
                        sx={{
                            color: theme.palette.secondary.light,
                        }}
                        fontSize={theme.spacing(2)}
                        letterSpacing={theme.spacing(0)}
                    >
                        Plot
                    </Typography>
                    <Typography
                        color="primary"
                        fontSize={theme.spacing(2)}
                        letterSpacing={theme.spacing(0)}
                        mt={theme.spacing(1)}
                    >
                        {Plot}
                    </Typography>
                </Box>
                <Grid
                    container
                    display="flex"
                    flexDirection="row"
                    mt={theme.spacing(2)}
                    spacing={2}
                >
                    <Grid item flexDirection="column" xs={4}>
                        <Typography
                            style={{ color: theme.palette.secondary.light }}
                            mb={theme.spacing(1)}
                        >
                            Cast
                        </Typography>
                        <Typography color="primary">{Actors}</Typography>
                    </Grid>
                    <Grid item flexDirection="column" xs={4}>
                        <Typography
                            style={{ color: theme.palette.secondary.light }}
                            mb={theme.spacing(1)}
                        >
                            Genre
                        </Typography>
                        <Typography color="primary">{Genre}</Typography>
                    </Grid>
                    <Grid item flexDirection="column" xs={4}>
                        <Typography
                            style={{ color: theme.palette.secondary.light }}
                            mb={theme.spacing(1)}
                        >
                            Director
                        </Typography>
                        <Typography color="primary">{Director}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Box
                    width={1}
                    height={1}
                    sx={{
                        backgroundImage: `url(${Poster})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        margin: "0 auto",
                    }}
                    maxWidth={300}
                />
            </Grid>
        </Grid>
    )
}

export default Movies
