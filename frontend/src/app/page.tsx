import React from "react";
import Link from "next/link";
import { Posts } from "../../types";
import Header from "./components/Header";
import { fetchOgpImage } from "./lib/fetchOgpImage";
import Qiita4PostsPage from "./components/Qiita4PostsPage";


  // const fetchData = async (): Promise<Posts[]> => {
  //   // const res = await fetch("/api/rails/postgres/");
  //   // const res = await fetch("/api/rails/qiita/partial");
  //   const res = await fetch("https://qiita.com/api/v2/items?query=user:taurosuke&per_page=4", { cache: 'force-cache'});
  //   console.log("res値", res);
  //   if(!res.ok) throw new Error('データ取得に失敗しました');
  //   return res.json();
  // };

async function Page() {
  const fetchData = async ():Promise<Posts[]> => {
    // 未認証で4記事分取得
    const res = await fetch(`https://qiita.com/api/v2/items?query=user:taurosuke&per_page=4`, { next: {revalidate: 600}});

    if(!res.ok) {
      throw new Error("データ取得に失敗しました");
    }
    return await res.json();
  }


  // const { data: postsData = [], isLoading, error } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: fetchData,
  //   staleTime: 1000 * 60 * 10,
  // });

  // async function onClickFetchData() {
  //   const data = (await getAllposts()) as Posts[];
  //   setPostsData(data);
  // }

  // Rails APIから全記事取得
  // async function onClickFetchData(){
  //   const data = await getAllpostsRails() as Posts[];
  //   console.log(data);
  //   setPostsData(data);
  // };

  // Qiitaから自分の記事取得
  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>エラーが発生しました</div>

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
      <Header>
        <Link href="/posts" className="btn btn-secondary mr-10">
          もっと見る
        </Link>
      </Header>
      <Qiita4PostsPage itemsWithOgp={itemsWithOgp} />
    </>
  );
}

export default Page;
