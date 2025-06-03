import { fetchOgpImage } from "../lib/fetchOgpImage";

describe("fetchOgpImage", () => {
  it("og:imageのURLを返すこと", async () => {
    // テスト用のHTML
    const ogImageUrl = "https://damy-contents.imgix.net/ogp-image.png";
    const html = `
    <html>
      <head>
        <meta property="og:image" content=${ogImageUrl}>
      </head>
    </html>
    `;

    // fetchをモック
    global.fetch = jest.fn().mockResolvedValue({
      text: () => Promise.resolve(html),
    });

    const result = await fetchOgpImage("http://example.com");
    expect(result).toBe(ogImageUrl);
  });

  it("og:imageがない場合は空文字を返すこと", async () => {
    const html = `<html><head></head><body></body></html>`;

    global.fetch = jest.fn().mockResolvedValue({
      text: () => Promise.resolve(html),
    });
    const result = await fetchOgpImage("http://example.com");
    expect(result).toBe("");
  });
});
