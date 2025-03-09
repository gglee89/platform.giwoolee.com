import { describe, it, expect, beforeEach, vi } from "vitest"
import {
    renderWithProviders,
    mockAxios,
    screen,
    waitFor,
} from "@/utils/test-utils"
import Movies from "./Movies"

const mockMovieData = {
    Title: "The Godfather",
    Year: "1972",
    Runtime: "175 min",
    Rated: "R",
    Poster: "https://example.com/poster.jpg",
    Ratings: [
        {
            Source: "Internet Movie Database",
            Value: "9.2/10",
        },
        {
            Source: "Rotten Tomatoes",
            Value: "98%",
        },
    ],
    Plot: "The aging patriarch of an organized crime dynasty transfers control to his son.",
    Actors: "Marlon Brando, Al Pacino, James Caan",
    Genre: "Crime, Drama",
    Director: "Francis Ford Coppola",
    imdbID: "tt0068646",
}

// Mock useParams
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom")
    return {
        ...actual,
        useParams: () => ({
            movieId: "tt0068646",
        }),
    }
})

describe("Movies Component", () => {
    beforeEach(() => {
        mockAxios.get.mockReset()
    })

    it("renders loading state initially", () => {
        mockAxios.get.mockImplementationOnce(() => new Promise(() => {}))
        renderWithProviders(<Movies />)
        expect(screen.getByText("Loading...")).toBeInTheDocument()
    })

    it("renders movie details when data is loaded", async () => {
        mockAxios.get.mockResolvedValueOnce({ data: mockMovieData })
        renderWithProviders(<Movies />)

        await waitFor(() => {
            expect(screen.getByText("The Godfather")).toBeInTheDocument()
        })

        // Check other important elements
        expect(screen.getByText("175 min")).toBeInTheDocument()
        expect(screen.getByText("1972")).toBeInTheDocument()
        expect(screen.getByText("R")).toBeInTheDocument()
        expect(screen.getByText("Crime, Drama")).toBeInTheDocument()
        expect(screen.getByText("Francis Ford Coppola")).toBeInTheDocument()
    })

    it("renders error state when API call fails", async () => {
        mockAxios.get.mockRejectedValueOnce(new Error("API Error"))
        renderWithProviders(<Movies />)
        expect(
            await screen.findByText("Error loading movie details")
        ).toBeInTheDocument()
    })

    it("renders empty state when no movie data is returned", async () => {
        mockAxios.get.mockResolvedValueOnce({ data: null })
        renderWithProviders(<Movies />)
        expect(await screen.findByText("Movie not found")).toBeInTheDocument()
    })
})
