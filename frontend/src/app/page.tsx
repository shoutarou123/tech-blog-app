import { BlogResponse, Posts } from "../../types";
import Header from "./components/Header";
import { fetchOgpImage } from "./lib/fetchOgpImage";
import Cms4BlogsPage from "./components/4Posts-4BlogsPage/Cms4BlogsPage";
import Qiita4PostsPage from "./components/4Posts-4BlogsPage/Qiita4PostsPage";

async function Page() {
  const fetchData = async (): Promise<Posts[]> => {
    // 未認証で4記事分取得
    try {
      const res = await fetch(`https://qiita.com/api/v2/items?query=user:taurosuke&per_page=4`, {
        next: { revalidate: 600 },
      });

      if (!res.ok) {
        throw new Error("Qiita: データ取得に失敗しました");
      }
      return await res.json();
    } catch (error) {
      console.error("errorをcatch", error);
      throw new Error("Qiita: データ取得に失敗しました");
    }
  };

  // CMSからデータ取得
  const fetchCmsData = async (): Promise<BlogResponse> => {
    try {
      const res = await fetch(`https://xigjaxd0bx.microcms.io/api/v1/blogs?offset=0&limit=4`, {
        next: { revalidate: 600 },
        headers: {
          "X-MICROCMS-API-KEY": process.env.CMS_API_KEY || "",
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("CMS: データ取得に失敗しました");
      return await res.json();
    } catch (error) {
      console.error("errorをcatch", error);
      throw new Error("CMS: データ取得に失敗しました");
    }
  };

  // CMSデータ呼び出し
  const cmsData = await fetchCmsData();

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
