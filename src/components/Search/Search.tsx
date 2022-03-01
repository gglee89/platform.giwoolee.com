import React from 'react'

// MUI
import { Box, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface SearchProps {
    searchKey: string
    updateSearchKey: Function
}

const Search: React.FC<SearchProps> = ({ searchKey, updateSearchKey }) => {
    const theme = useTheme()

    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{                
                '& > :not(style)': {
                    my: 1
                }
            }}
        >
            <TextField
                variant="outlined"
                value={searchKey}
                onChange={e => updateSearchKey(e.target.value)}
                sx={{
                    background: theme.palette.primary.main,
                }}
                color="primary"
                margin="normal"
                fullWidth
            />
        </Box>  
    )
}

export default Search