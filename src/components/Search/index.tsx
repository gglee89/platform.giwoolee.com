import React from "react"
import { Box } from "@mui/material"

interface SearchProps {
    searchKey: string
    updateSearchKey: (value: string) => void
}

const Search: React.FC<SearchProps> = ({ searchKey, updateSearchKey }) => {
    return (
        <Box>
            <input
                type="text"
                value={searchKey}
                onChange={(e) => updateSearchKey(e.target.value)}
                placeholder="Search movies..."
                data-testid="search-input"
            />
        </Box>
    )
}

export default Search
