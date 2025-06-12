import { getCloneableBody } from "next/dist/server/body-streams";
import PageClient, { fetchAllData } from "../posts/page.client";

// jest.mock("../posts/page.client", () => ({
//   ...jest.requireActual("../posts/page.client"),
//   fetchAllData: jest.fn(),
// }));

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
});
