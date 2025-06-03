const mockQiitaPostsPage = jest.fn((_props) => null);
// QiitaPostsPageのﾓｯｸ化 呼び出されたときに引数のpropsを受け取る 実際のｺﾝﾎﾟｰﾈﾝﾄではJSXを返しているがﾃｽﾄではどんなpropsが渡されたかを検証するためnullを返すようにする

jest.mock("../components/QiitaPostsPage", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => mockQiitaPostsPage(props),
  // default: でデフォルトエクスポートを上書きしています。
  // QiitaPostsPageコンポーネントが呼ばれた時、propsを受け取ってmockQiitaPostsPage(props)を呼ぶ
  // Jestのモック関数には、**呼び出された回数・引数・返り値などが自動的に記録される「.mockプロパティ」**が付く
}));

jest.mock("../lib/fetchOgpImage", () => ({
  fetchOgpImage: jest.fn().mockResolvedValue("mocked-ogp-url"),
  // 本物のfetchOgpImageをﾓｯｸ化。これが呼ばれるとmocked-ogp-urlをPromiseで返す設定をしている
}));

import { fetchOgpImage } from "../lib/fetchOgpImage";
import Page from "../posts/page";
import page from "../posts/page";
import { render } from "@testing-library/react";

const mockData1 = [
  { id: "1", title: "公開記事1", url: "https://koukai1", private: false },
  { id: "2", title: "非公開記事1", url: "https://hikoukai1", private: true },
]; // mockData作成

const mockData2 = [{ id: "3", title: "非公開記事2", url: "https://hikoukai2", private: true }]; // mockData作成

let fetchCallCount = 0;
const dataResponse = () => {
  fetchCallCount++;
  if (fetchCallCount === 1) {
    return Promise.resolve({
      ok: true,
      status: 200,
      statusText: "ok",
      json: () => Promise.resolve(mockData1),
    });
  } else {
    return Promise.resolve({
      ok: true,
      status: 200,
      satuText: "ok",
      json: () => Promise.resolve(mockData2),
    });
  }
};

// レスポンスの.json()メソッドを呼ぶと、mockDataがPromiseで返されるようにしている
// fetchのレスポンスの.json()と同じ動作を模倣

global.fetch = jest.fn().mockImplementation(dataResponse);
// テスト実行中にfetch関数をモック（偽物に置き換え）して、fetchが呼ばれるたびにdataResponse関数が実行されるようにする

describe("page関数のテスト", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    (fetchOgpImage as jest.Mock).mockClear();
    mockQiitaPostsPage.mockClear();
  });

  it("公開記事だけ抽出しogp画像が付与されること", async () => {
    const jsx = await page();
    render(jsx);
    // await page()は「テスト対象のロジックを実際に動かす」ために必須の一行
    // これがないと、テストで検証したい副作用（API呼び出しやprops受け渡し）が何も起こらない

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(fetchOgpImage).toHaveBeenCalledTimes(1);

    // QiitaPostsPageに渡されたpropsを検証
    expect(mockQiitaPostsPage).toHaveBeenCalledWith(
      expect.objectContaining({
        // オブジェクトの部分一致を検証するJestのマッチャーです。
        // propsに他のプロパティがあってもOK、ここで指定したプロパティが含まれていれば合格、という意味。

        allPosts: [
          {
            ...mockData1[0],
            ogpImageUrl: "mocked-ogp-url",
          },
        ],
        limit: 4,
      })
    );
  });

  it("fetchがrejectした際にエラーをthrowすること", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("データ取得に失敗しました"));
    await expect(Page()).rejects.toThrow("データ取得に失敗しました");
  });

  it("fetchがok:falseの場合にエラーをthrowすること", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });
    await expect(Page()).rejects.toThrow("データ取得に失敗しました");
  });
});
