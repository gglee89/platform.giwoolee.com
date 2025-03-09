import { describe, it, expect, beforeEach } from "vitest"
import {
    renderWithProviders,
    mockAxios,
    screen,
    fireEvent,
    waitFor,
} from "@/utils/test-utils"
import Home from "./Home"

const mockMoviesData = {
    Search: [
        {
            Title: "The Godfather",
            Year: "1972",
            imdbID: "tt0068646",
            Type: "movie",
            Poster: "https://example.com/poster.jpg",
        },
    ],
    totalResults: "1",
    Response: "True",
}

describe("Home Component", () => {
    beforeEach(() => {
        mockAxios.get.mockReset()
    })

    it("renders empty state initially", () => {
        mockAxios.get.mockImplementationOnce(() => new Promise(() => {}))
        renderWithProviders(<Home />)
        expect(
            screen.getByText("Don't know what to search?")
        ).toBeInTheDocument()
    })

    it("renders movie list when search returns results", async () => {
        mockAxios.get.mockResolvedValueOnce({ data: mockMoviesData })
        renderWithProviders(<Home />)

        const searchInput = screen.getByLabelText("search movies")
        fireEvent.change(searchInput, { target: { value: "godfather" } })

        await waitFor(
            () => {
                expect(screen.getByText("The Godfather")).toBeInTheDocument()
            },
            { timeout: 2000 }
        )
    })

    it("handles empty search results", async () => {
        mockAxios.get.mockResolvedValueOnce({
            data: {
                Search: null,
                Response: "False",
                Error: "Movie not found!",
            },
        })

        renderWithProviders(<Home />)

        const searchInput = screen.getByLabelText("search movies")
        fireEvent.change(searchInput, { target: { value: "nonexistentmovie" } })

        await waitFor(() => {
            expect(
                screen.getByText("Don't know what to search?")
            ).toBeInTheDocument()
        })
    })
})
