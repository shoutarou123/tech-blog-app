import { render, screen } from "@testing-library/react";

import Page from "../page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("../lib/fetchOgpImage", () => ({
  fetchOgpImage: jest.fn().mockResolvedValue("https://damy-contents.imgix.net/ogp-image.png"),
}));

beforeEach(() => {
  global.fetch = jest.fn();
});

describe("Page", () => {
  it("!res.okの場合にErrorをthrowすること", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("データ取得に失敗しました"));

    await expect(Page()).rejects.toThrow("データ取得に失敗しました");
  });

  it("fetchがok: falseの場合にErrorをthrowすること", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });
    await expect(Page()).rejects.toThrow("データ取得に失敗しました");
  });
  it("fetchが成功した場合ダミーデータを返すこと", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [
        {
          id: 1,
          title: "テストタイトル",
          created_at: "20251111",
          url: "test@test.com",
          thumbnail: "test_image",
          private: false,
        },
      ],
    });
    const queryClient = new QueryClient();
    const page = await Page();
    render(
      <QueryClientProvider client={queryClient}>
        {page}
      </QueryClientProvider>
    )
    expect(screen.getByText("テストタイトル")).toBeInTheDocument();
  });
});
