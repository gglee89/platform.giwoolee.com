import axios from 'axios'

export const getRequest = async (reqBody: any) => {
    const { data } = await axios.get(
        `${process.env.OMDB_API_URL}`,
        {
            params: {
                apikey: process.env.OMDB_API_KEY,
                ...reqBody,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return data
}