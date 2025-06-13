import { getCloneableBody } from "next/dist/server/body-streams";
import PageClient, { fetchAllData } from "../posts/page.client";
import { useQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { Posts } from "../../../types";

// jest.mock("../posts/page.client", () => ({
//   ...jest.requireActual("../posts/page.client"),
//   fetchAllData: jest.fn(),
// }));

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
    // (fetchAllData as jest.Mock).mockRejectedValue(new Error("データ取得に失敗しました"));
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
    // (fetchAllData as jest.Mock).mockResolvedValue(mockData);
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

  it("個人記事一覧が表示されていること、戻るのlinkタグが存在していること", async () => {
    const mockData: Posts[] = [
      {
        id: 1,
        title: "testtitle",
        created_at: "20251111",
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
    render(<PageClient limit={4} />);
    expect(screen.getByText("個人記事一覧")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "戻る"})).toBeInTheDocument();
  });
});
