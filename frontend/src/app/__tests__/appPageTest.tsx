import Page from "../page";

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
});
