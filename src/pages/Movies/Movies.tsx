import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Movies: React.FC = () => {
    const { movieId } = useParams()

    return (
        <div>Movies page { movieId && `movie Id: ${movieId}` }</div>
    )
}

export default Movies