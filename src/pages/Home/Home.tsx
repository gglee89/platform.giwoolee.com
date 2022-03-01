import React, { useEffect, useState } from 'react'

// Components
import Search from '../../components/Search'
import CardBox from '../../components/CardBox'

// Actions
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchMovies, getMovies } from '../../features/movies/moviesSlice'

// MUI
import { Container, Grid } from '@mui/material'

const Home: React.FC = () => {
    const [searchKey, setSearchKey] = useState('')
    const movies = useAppSelector(getMovies)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (movies.length === 0) dispatch(fetchMovies({ s: 'Harry Potter' }))
    }, [])

    return (
        <Container maxWidth="md">
            <Search searchKey={searchKey} updateSearchKey={setSearchKey} />            
            <Grid container spacing={2} sx={{ mt: 5 }}>
                {
                    movies
                        .filter(item => item.Type === "movie" && item.Title.toLowerCase().includes(searchKey.toLowerCase()))
                        .map(({ Title, Year, Poster, imdbID, Type }, idx) => {
                        return (
                            <Grid item key={idx} xs={3}>
                                <CardBox                                    
                                    Title={Title}
                                    Year={Year}
                                    Poster={Poster}
                                    imdbID={imdbID}
                                    Type={Type}
                                />
                            </Grid>
                        )
                    })
                }                
            </Grid>
        </Container>
    )
}

export default Home