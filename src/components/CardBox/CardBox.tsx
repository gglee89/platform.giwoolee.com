import React from 'react'

// MUI
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Assets
import { ReactComponent as HeartIconSVG } from '../../assets/icons/icon-heart-white.svg'

// Interface
import { Movie } from '../../features/movies/moviesSlice'

const CardBox: React.FC<Movie> = ({ Title, Year, Poster, imdbID, Type }) => {
    const theme = useTheme();

    return (
        <Box
            width={1}
            height={1}
        >
            <Card   
                sx={{                                        
                    backgroundImage: `url(${Poster})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: 'none',
                    height: 450,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                        color: theme.palette.primary.main,
                        cursor: 'pointer',
                        '& > div': { visibility: 'visible' },
                    }
                }}
                variant="outlined">
                <CardContent
                    sx={{
                        backgroundColor: theme.palette.primary.dark,
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                        opacity: 0.8,                        
                        padding: theme.spacing(1),
                        width: '100%',
                        visibility: 'hidden',
                    }}
                >
                    <Box sx={{ textAlign: 'end' }}>
                        <IconButton
                            sx={{
                                '&:hover': {
                                    backgroundColor: theme.palette.error.main
                                }
                            }}
                        >
                            <HeartIconSVG />
                        </IconButton>
                    </Box>
                    <Box>
                        <Typography sx={{  mb: 1 }}>
                            {Title}
                        </Typography>
                        <Typography variant="body1">
                            {Year}
                        </Typography>            
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CardBox