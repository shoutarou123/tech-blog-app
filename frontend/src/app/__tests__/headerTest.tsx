import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Header", () => {
  it("Linkタグが存在すること", async () => {
    render(<Header />);
    expect(await screen.findByTestId("nextlink")).toBeInTheDocument();
  });
});
