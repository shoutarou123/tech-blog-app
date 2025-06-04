"use client";

import React, { useMemo, useState } from "react";
import { Posts } from "../../../types";
import Link from "next/link";
import Image from "next/image";
import { formattedDate } from "../utils/formattedDate";
import ClientSidePagenation from "./ClientSidePagenation";
import { useQuery } from "@tanstack/react-query";

const thumbnail =
  "https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9SmF2YVNjcmlwdCVFMyU4MSVBN1VSTCVFMyU4MSU4QiVFMyU4MiU4OU9HUCVFNSU4RiU5NiVFNSVCRSU5NyVFMyU4MSU5OSVFMyU4MiU4QiZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1jbGlwPWVsbGlwc2lzJnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9NDM5YjY5NjY3Nzg3ZTExYzdmYTM2YjI1ZDg3NTcyN2Y&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwa3N5dW5ubm4mdHh0LWNvbG9yPSUyMzIxMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZzPWUxMjJhOTA1NDdiNTMzNDI4MWY3YmU0M2U2Y2I1M2Rh&blend-x=142&blend-y=491&blend-mode=normal&s=1a611f7e8833ff640580434a1b03d27a";

type Props = {
  limit: number;
};

const fetchAllData = async (): Promise<Posts[]> => {
  const res = await fetch("http://qiita.com/api/v2/items?query=user:taurosuke&per_page=100");
  if (!res.ok) throw new Error(`データ取得に失敗しました ${res.statusText}`);
  return res.json();
};

function QiitaPostsPage({ limit }: Props) {
  const {
    data: postsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allposts"],
    queryFn: fetchAllData,
    staleTime: 1000 * 60 * 10,
  });

  // qiita画像取得
  // const itemsWithOgp = await Promise.all(
  //   postsData.map(async (posts) => ({
  //     ...posts,
  //     ogpImageUrl: await fetchOgpImage(posts.url), // 取得処理関数にurlを渡す
  //   }))
  // );

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(postsData.length / limit);

  const pageItems = useMemo(
    () => postsData.slice((currentPage - 1) * limit, currentPage * limit),
    [postsData, currentPage, limit]
  );

  if (!isLoading) <div>Loading...</div>;
  if (error) <div>エラーが発生しました</div>;

  return (
    <>
      <div className="grid justify-items-center md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {pageItems.map((posts: Posts) => {
          return (
            <Link href={posts.url} key={posts.id} className="card bg-base-100 w-96 shadow-lg">
              <figure>
                <Image src={thumbnail} alt="画像" width={400} height={300} priority={true} />
              </figure>
              <div className="card-body bg-base-content/5">
                <p>{formattedDate(posts.created_at)}</p>
                <h2 className="card-title">{posts.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-3 items-center mt-4">
        <div></div>
        <div className="justify-self-center">
          <ClientSidePagenation currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

        <div className="justify-self-end">
          <Link href="/" className="text-white btn btn-primary mr-10">
            戻る
          </Link>
        </div>
      </div>
    </>
  );
}

export default QiitaPostsPage;
