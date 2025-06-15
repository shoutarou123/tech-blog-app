import { render, screen } from "@testing-library/react";
import Page from "../blogs/page";
import userEvent from "@testing-library/user-event";

describe("blogs/page.tsx", () => {

  it("!res.okの場合にErrorをthrowすること", async () => {
    global.fetch = jest.fn((url) => {
      if (url.toString().includes("microcms.io")) {
        return Promise.resolve({
          ok: false,
          status: 500,
          json: () => ({}),
        } as Response);
      }
    }) as jest.Mock;
    expect(Page()).rejects.toThrow("データ取得に失敗しました");
  });

  it("res.okの場合にdataを返すこと、戻るボタンが存在すること、戻るボタン押すと'/'が呼ばれること、ページネーションのボタンが存在すること", async () => {
    const user = userEvent.setup();
    const mockData = {
      contents: [
        {
          id: "test-id",
          createdAt: "2025-01-01T01:01:01",
          title: "テストタイトル",
          content: "test-content",
        },
      ],
    };
    global.fetch = jest.fn((url) => {
      if (url.toString().includes("microcms.io")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockData),
        } as Response);
      }
    }) as jest.Mock;

    render(await Page());
    expect(screen.getByText("ブログ記事一覧")).toBeInTheDocument();
    const backButton = screen.getByRole("link", { name: "戻る" });
    expect(backButton).toBeInTheDocument();
    expect(screen.getByText("テストタイトル")).toBeInTheDocument();
    await user.click(backButton);
    expect(backButton).toHaveAttribute("href", "/");
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
  });

  it("headersが渡されていること", async () => {
    process.env.CMS_API_KEY = "dummy-dai-key";
    const mockData = {
      contents: [
        {
          id: "test-id",
          createdAt: "2025-01-01T01:01:01",
          title: "テストタイトル",
          content: "test-content",
        },
      ],
    };
    global.fetch = jest.fn((url, init) => {
      if (url.toString().includes("microcms.io")) {
        // headersがundefinedではないことの検証
        expect(init?.headers).toBeDefined();
        // headersのX-MICROCMS-API-KEYにdummy-dai-keyが渡されていることの検証
        expect((init.headers as Record<string, string>)["X-MICROCMS-API-KEY"]).toBe("dummy-dai-key");
        // headersのContent-Typeにapplication/jsonが渡されていることの検証
        expect((init.headers as Record<string, string>)["Content-Type"]).toBe("application/json");
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockData),
        } as Response);
      }
    }) as jest.Mock;
    render(await Page());
  });

  it("X-MICROCMS-API-KEYがundefinedでもエラーを返さないこと", async () => {
    delete process.env.CMS_API_KEY;
    const mockData = {
      contents: [],
    };
    global.fetch = jest.fn((url, init) => {
      if (url.toString().includes("microcms.io")) {
        expect((init?.headers as Record<string, string>)["X-MICROCMS-API-KEY"]).toBe("");
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockData),
        } as Response);
      }
    }) as jest.Mock;
    render(await Page());
  });
});
