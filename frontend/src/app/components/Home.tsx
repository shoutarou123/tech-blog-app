"use client";
import React from "react";
import { Posts } from "../../../types";
import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import { useQuery } from "@tanstack/react-query";

const thumbnail =
  "https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9SmF2YVNjcmlwdCVFMyU4MSVBN1VSTCVFMyU4MSU4QiVFMyU4MiU4OU9HUCVFNSU4RiU5NiVFNSVCRSU5NyVFMyU4MSU5OSVFMyU4MiU4QiZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1jbGlwPWVsbGlwc2lzJnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9NDM5YjY5NjY3Nzg3ZTExYzdmYTM2YjI1ZDg3NTcyN2Y&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwa3N5dW5ubm4mdHh0LWNvbG9yPSUyMzIxMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZzPWUxMjJhOTA1NDdiNTMzNDI4MWY3YmU0M2U2Y2I1M2Rh&blend-x=142&blend-y=491&blend-mode=normal&s=1a611f7e8833ff640580434a1b03d27a";

  const fetchData = async (): Promise<Posts[]> => {
    // const res = await fetch("/api/rails/postgres/");
    // const res = await fetch("/api/rails/qiita/partial");
    const res = await fetch("https://qiita.com/api/v2/items?query=user:taurosuke&per_page=4", { cache: 'force-cache'});
    console.log("res値", res);
    if(!res.ok) throw new Error('データ取得に失敗しました');
    return res.json();
  };
function Home() {
  const { data: postsData = [], isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 10,
  });

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
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>エラーが発生しました</div>

  return (
    <>
      <Header>
        <Link href="/posts" className="btn btn-secondary mr-10">
          もっと見る
        </Link>
      </Header>
      <div
        className="grid justify-items-center
    md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {postsData.map((posts) => {
          const date = new Date(posts.created_at);
          const formattdDate = `${date.getFullYear()}年${(date.getMonth() + 1).toString().padStart(2, "0")}月${date
            .getDate()
            .toString()
            .padStart(2, "0")}日${date.getHours().toString().padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
          return (
            <Link href={posts.url} key={posts.id} className="card bg-base-100 w-96 shadow-lg">
              <figure>
                <Image src={thumbnail} alt="画像" width={400} height={300} priority={true} />
              </figure>
              <div className="card-body bg-base-content/5">
                <p>{formattdDate}</p>
                <h2 className="card-title">{posts.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Home;
