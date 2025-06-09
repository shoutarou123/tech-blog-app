import React from "react";
import { BlogResponse, Posts } from "../../types";
import Header from "./components/Header";
import { fetchOgpImage } from "./lib/fetchOgpImage";
import Qiita4PostsPage from "./components/Qiita4PostsPage";
import Cms4BlogsPage from "./components/Cms4BlogsPage";

async function Page() {
  const fetchData = async (): Promise<Posts[]> => {
    // 未認証で4記事分取得
    const res = await fetch(`https://qiita.com/api/v2/items?query=user:taurosuke&per_page=4`, {
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      throw new Error("データ取得に失敗しました");
    }
    return await res.json();
  };

  // CMSからデータ取得
  const fetchCmsData = async (): Promise<BlogResponse> => {
    const res = await fetch(`https://xigjaxd0bx.microcms.io/api/v1/blogs?offset=0&limit=4`, {
      next: { revalidate: 600 },
      headers: {
        "X-MICROCMS-API-KEY": process.env.CMS_API_KEY || "",
        "Content-Type": "application/json",
      },
    });
    if(!res.ok) throw new Error("データ取得に失敗しました");
    return await res.json();
  };

  // CMSデータ呼び出し
  const cmsData = await fetchCmsData();
  console.log("cmsData", cmsData);

  // Qiita記事データ取得
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
      <div className="mx-2">
      <Qiita4PostsPage itemsWithOgp={itemsWithOgp} />
      <Cms4BlogsPage cmsData={cmsData} />
      </div>
    </>
  );
}

export default Page;
