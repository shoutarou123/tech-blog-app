const { Response } = require("node-fetch");
import { render, screen } from "@testing-library/react";
import Page from "../page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

global.Response = Response;

jest.mock("../lib/fetchOgpImage", () => ({
  fetchOgpImage: jest.fn().mockResolvedValue("https://damy-contents.imgix.net/ogp-image.png"),
}));

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.toString().includes("qiita.com")) {
      return Promise.resolve(
        new Response(
          JSON.stringify([
            {
              id: 1,
              title: "テストタイトル",
              created_at: "20251111",
              url: "test@test.com",
              thumbnail: "test_image",
              private: false,
            },
          ]),
          { status: 200, statusText: "OK" }
        )
      );
    } else if (url.toString().includes("microcms.io")) {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            contents: [
              {
                id: "microcms-id",
                title: "MicroCMSテストタイトル",
                createdAt: "20251111",
                content: "testcontent",
              },
            ],
          }),
          { status: 200, statusText: "OK" }
        )
      );
    }
    return Promise.resolve(new Response(JSON.stringify([]), { status: 500, statusText: "Internal Server Error" }));
  });
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
    const queryClient = new QueryClient();
    const page = await Page();
    render(<QueryClientProvider client={queryClient}>{page}</QueryClientProvider>);
    expect(screen.getByText("テストタイトル")).toBeInTheDocument();
    expect(screen.getByText("MicroCMSテストタイトル")).toBeInTheDocument();
  });

  it("Qiita fetchがok: falseの場合にErrorをthrowすること", async () => {
    global.fetch = jest.fn((url) => {
      if (url.toString().includes("qiita.com")) {
        return Promise.resolve({
          ok: false,
          status: 500,
          json: async () => ({}),
        });
      }
      return Promise.resolve(
        new Response(
          JSON.stringify({
            contents: [
              {
                id: "microcms-id",
                title: "MicroCMSテストタイトル",
                createdAt: "20251111",
                content: "testcontent",
              },
            ],
          }),
          { status: 200, statusText: "OK" }
        )
      );
    });
    await expect(Page()).rejects.toThrow("データ取得に失敗しました");
  });

  it("process.env.CMS_API_KEYが渡されていること", async () => {
    process.env.CMS_API_KEY = "dummy-api-key";
    global.fetch = jest.fn((url, init) => {
      if (url.toString().includes("microcms.io")) {
        if (init?.headers) {
          expect((init?.headers as Record<string, string>)["X-MICROCMS-API-KEY"]).toBe("dummy-api-key");
        }
        return Promise.resolve(
          new Response(
            JSON.stringify({
              contents: [
                {
                  id: "microcms-id",
                  title: "MicroCMSテストタイトル",
                  createdAt: "20251111",
                  content: "testcontent",
                },
              ],
            }),
            { status: 200, statusText: "OK" }
          )
        );
      } else if (url.toString().includes("qiita.com")) {
        return Promise.resolve(
          new Response(
            JSON.stringify([
              {
                id: 1,
                title: "テストタイトル",
                created_at: "20251111",
                url: "test@test.com",
                thumbnail: "test_image",
                private: false,
              },
            ]),
            { status: 200, statusText: "OK" }
          )
        );
      }
    }) as jest.MockedFunction<typeof fetch>;
    const queryClient = new QueryClient();
    const page = await Page();
    render(<QueryClientProvider client={queryClient}>{page}</QueryClientProvider>);
  });
});
