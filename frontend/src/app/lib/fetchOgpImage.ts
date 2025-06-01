import { JSDOM } from "jsdom";

export const fetchOgpImage = async (url: string): Promise<string> => {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const dom = new JSDOM(html);
    const meta = dom.window.document.querySelector('meta[property="og:image"]');
    return meta?.getAttribute("content") || "";
  } catch {
    return "";
  }
};
