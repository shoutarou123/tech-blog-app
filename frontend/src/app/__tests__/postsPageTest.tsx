import PageClient, { fetchAllData } from "../posts/page.client";
import { useQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { Posts } from "../../../types";
import userEvent from "@testing-library/user-event";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("postsPage", () => {
  it("!res.okの場合にErrorをthrowすること", async () => {
    global.fetch = jest.fn((url) => {
      if (url.toString().includes("qiita.com")) {
        return Promise.resolve({
          ok: false,
          status: 500,
          json: async () => ({}),
        } as Response);
      }
    }) as jest.Mock;
    await expect(fetchAllData()).rejects.toThrow("データ取得に失敗しました");
  });

  it("正常にデータを取得できること", async () => {
    const mockData = [{ id: "test-id", title: "テストタイトル", created_at: "20251111", url: "https://damy.com" }];
    global.fetch = jest.fn((url) => {
      if (url.toString().includes("qiita.com")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => mockData,
        } as Response);
      }
    }) as jest.Mock;
    const result = await fetchAllData();
    expect(result).toEqual(mockData);
  });

  it("ローディング中はLoading...が表示されること", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });
    render(<PageClient limit={4} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("useQueryでエラーが発生した際はエラーが発生しましたが表示されること", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true,
    });
    render(<PageClient limit={4} />);
    expect(screen.getByText("エラーが発生しました")).toBeInTheDocument();
  });

  it("個人記事一覧が表示されていること、戻るのlinkタグが存在していること、テストタイトルが表示されていること、1995年12月17日03:24:00が表示されていること、戻るボタンを押すと'/'が呼ばれること", async () => {
    const mockData: Posts[] = [
      {
        id: 1,
        title: "テストタイトル",
        created_at: "1995-12-17T03:24:00",
        url: "test@test.com",
        thumbnail: "testthumbnail",
        private: false,
      },
    ];

    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });
    const user = userEvent.setup();
    render(<PageClient limit={4} />);
    expect(screen.getByText("個人記事一覧")).toBeInTheDocument();
    const backButton = screen.getByRole("link", { name: "戻る" });
    expect(backButton).toBeInTheDocument();
    expect(screen.getByText("テストタイトル")).toBeInTheDocument();
    expect(screen.getByText("1995年12月17日03:24:00")).toBeInTheDocument();
    await user.click(backButton);
    expect(backButton).toHaveAttribute("href","/");
  });
});
