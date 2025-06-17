import { render, screen, waitFor } from "@testing-library/react";
import CmsClientSidePagenation from "../components/pagenation/CmsClientSidePagenation";
import userEvent from "@testing-library/user-event";

describe("CmsClientSidePagenation", () => {
  it("ページネーションが表示されていること", async () => {
    render(<CmsClientSidePagenation currentPage={1} totalPages={10} onPageChange={function () {}} />);
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "＜" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "＞" })).toBeInTheDocument();
  });

  it("現在のページがトータルページ-2よりも大きい場合にもページネーションが表示されていること", async () => {
    render(<CmsClientSidePagenation currentPage={3} totalPages={4} onPageChange={function () {}} />);
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "＜" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "＞" })).toBeInTheDocument();
  });

  it("ボタンをクリックすると色が変わること", async () => {
    let currentPage = 4;
    const onPageChange = jest.fn((page) => {
      currentPage = page;
    });
    const { rerender } = render(
      <CmsClientSidePagenation currentPage={currentPage} totalPages={5} onPageChange={onPageChange} />
    );

    const button3 = screen.getByRole("button", { name: "3" });
    await userEvent.click(button3);
    waitFor(() => {
      expect(button3).toHaveBeenCalledWith(3);
    });

    rerender(<CmsClientSidePagenation currentPage={currentPage} totalPages={5} onPageChange={onPageChange} />);
    expect(button3).toHaveClass("text-white");
    expect(button3).toHaveClass("bg-[#5696e3]");
  });

  it("＞を押すと", async () => {
    let currentPage = 4;
    const onPageChange = jest.fn((page) => {
      return (currentPage = page);
    });
    const { rerender } = render(
      <CmsClientSidePagenation currentPage={currentPage} totalPages={15} onPageChange={onPageChange} />
    );

    const nextButton = screen.getByRole("button", { name: "＞" });
    await userEvent.click(nextButton);

    rerender(<CmsClientSidePagenation currentPage={currentPage} totalPages={15} onPageChange={onPageChange} />);
    expect(screen.getByRole("button", { name: "7" })).toBeInTheDocument();
  });

  it("＜を押すと", async () => {
    let currentPage = 4;
    const onPageChange = jest.fn((page) => {
      return (currentPage = page);
    });
    const { rerender } = render(
      <CmsClientSidePagenation currentPage={currentPage} totalPages={15} onPageChange={onPageChange} />
    );

    const prevButton = screen.getByRole("button", { name: "＜" });
    await userEvent.click(prevButton);

    rerender(<CmsClientSidePagenation currentPage={currentPage} totalPages={15} onPageChange={onPageChange} />);
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
  });
});
