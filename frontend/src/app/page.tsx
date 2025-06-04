import React from "react";
import { Posts } from "../../types";
import Header from "./components/Header";
import { fetchOgpImage } from "./lib/fetchOgpImage";
import Qiita4PostsPage from "./components/Qiita4PostsPage";

async function Page() {

  const fetchData = async ():Promise<Posts[]> => {
    // 未認証で4記事分取得
    const res = await fetch(`https://qiita.com/api/v2/items?query=user:taurosuke&per_page=4`, { next: {revalidate: 600}});

    if(!res.ok) {
      throw new Error("データ取得に失敗しました");
    }
    return await res.json();
  }

  // 記事データ取得
  const fetchPosts = await fetchData();

  // qiita画像取得
  const itemsWithOgp = await Promise.all(
    fetchPosts.map(async (posts) => ({
      ...posts,
      ogpImageUrl: await fetchOgpImage(posts.url),
    }))
  );

  return (
    <>
      <Header />
      <Qiita4PostsPage itemsWithOgp={itemsWithOgp} />
    </>
  );
}

export default Page;
