import { render, screen, waitFor } from "@testing-library/react";
import Home from "../components/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockPosts = [{ id: "1", title: "記事1", url: "https://test1" }];

beforeEach(() => {
  global.fetch = jest.fn();
});

describe("Page", () => {
  it("もっと見るlinkタグが存在すること", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockPosts,
    });

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(await screen.findByRole("link", { name: "もっと見る" })).toBeInTheDocument();
  });

  it("値が取得できなかった場合にエラーを返すこと", async () => {
    const queryClient = new QueryClient();
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    waitFor(() => {
      expect(screen.findByText("エラーが発生しました")).toBeInTheDocument();
    });
  });

  it("!res.okの場合にErrorをthrowすること", async () => {
    const queryClient = new QueryClient();
    global.fetch = jest.fn().mockRejectedValue(new Error("データ取得に失敗しました"));
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    waitFor(() => {
      expect(screen.findByText("データ取得に失敗しました")).toBeInTheDocument();
    });
  });
});
