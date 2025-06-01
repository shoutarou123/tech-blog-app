import { render, screen } from "@testing-library/react"
import Home from "../components/Home";

describe('Page', () => {
  it('rendersa button', () => {
    render(<Home />)

    expect(screen.getByRole("link", { name: "ダミーボタン"})).toBeInTheDocument();
  });
});
