import { render, screen } from "@testing-library/react";
import Page from "../page";

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

    const jsx = await Page();
    render(jsx);

    expect(await screen.findByRole("link", { name: "もっと見る" })).toBeInTheDocument();
  });

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
});
