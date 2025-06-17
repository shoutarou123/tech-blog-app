import { Posts } from "../../../../../types";

export const fetchAllPosts = async (): Promise<Posts[]> => {
  try {
    const res = await fetch("https://qiita.com/api/v2/items?query=user:taurosuke&per_page=100");
    if (!res.ok) throw new Error(`データ取得に失敗しました`);
    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};
