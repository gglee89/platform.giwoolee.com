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
        <TextField
            autoComplete="off"
            variant="outlined"
            value={searchKey}
            onChange={e => updateSearchKey(e.target.value)}
            placeholder="Search movies..."
            sx={{
                background: theme.palette.primary.main,
                "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                        borderColor: theme.palette.warning.main,
                        borderRadius: '0px'
                    }
                }
            }}
            color="primary"
            margin="normal"
            fullWidth
        />
    )
}

export default Search