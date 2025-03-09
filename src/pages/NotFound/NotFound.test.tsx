import { render, screen } from "@testing-library/react"
import NotFound from "./NotFound"
import { it, expect } from "vitest"

it("renders learn react link", () => {
    render(<NotFound />)
    const textElement = screen.getByText(/NotFound page/i)
    expect(textElement).toBeInTheDocument()
})
