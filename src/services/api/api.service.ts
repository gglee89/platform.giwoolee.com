import axios from 'axios'

export const getRequest = async (reqBody: { [key: string]: string }) => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_OMDB_API_URL}`,
        {
            params: {
                apikey: process.env.REACT_APP_OMDB_API_KEY,
                ...reqBody,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return data
}