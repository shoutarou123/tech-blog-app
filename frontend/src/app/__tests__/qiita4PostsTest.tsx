import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Qiita4PostsPage from "../components/4Posts-4BlogsPage/Qiita4PostsPage";
import { fetchAllPosts } from "../api/nextjs/qiita/api";
import { QiitaThumbnail } from "../components/QiitaThumbnail";
import userEvent from "@testing-library/user-event";

describe("Qiita4PostsPage", () => {

  it("fetchAllPostsが呼ばれること", async () => {
    const queryClient = new QueryClient();
    const spy = jest.spyOn(queryClient, "prefetchQuery");
    render(
      <QueryClientProvider client={queryClient}>
        <Qiita4PostsPage itemsWithOgp={[]} />
      </QueryClientProvider>
    );
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ queryKey: ["allposts"] }));
  });

  it("fetchAllPostsで!res.okでエラーが投げられること", async () => {
    global.fetch = jest.fn((url) => {
      if (url.toString().includes("qiita.com")) {
        return Promise.resolve({
          ok: false,
          status: 500,
          json: () => ({}),
        } as Response);
      }
    }) as jest.Mock;
    await expect(fetchAllPosts()).rejects.toThrow("データ取得に失敗しました");
  });

  it("個人記事というタイトルが表示されていること", async () => {
    const user = userEvent.setup();
    const queryClient = new QueryClient();
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            id: 1,
            title: "テストタイトル",
            created_at: "2025-01-01T01:01:01",
            url: "test@example.com",
            thumbnail: QiitaThumbnail,
            private: false,
          }),
      });
    }) as jest.Mock;
    render(
      <QueryClientProvider client={queryClient}>
        <Qiita4PostsPage itemsWithOgp={[]} />
      </QueryClientProvider>
    );
    expect(screen.getByText("個人記事")).toBeInTheDocument();
    const showPostsButton = screen.getByRole("link", { name: "もっと見る" });
    await user.click(showPostsButton);
    expect(showPostsButton).toHaveAttribute("href", "/posts");
  });

  it("console.errorが呼ばれていること", async () => {
    global.fetch = jest.fn(() => {
      return Promise.reject(new Error("ネットワークエラー"))
    }) as jest.Mock;
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    await expect(fetchAllPosts()).rejects.toThrow("ネットワークエラー");
    expect(spy).toHaveBeenCalledWith("ネットワークエラー");
    spy.mockReset();
  });
});
