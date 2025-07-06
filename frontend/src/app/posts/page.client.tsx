"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import { Posts } from "../../../types";
import { formattedDate } from "../utils/formattedDate";
import { QiitaThumbnail } from "../components/QiitaThumbnail";
import QiitaClientSidePagenation from "../components/pagenation/QiitaClientSidePagenation";

type Props = {
  limit: number;
};

export const fetchAllData = async (): Promise<Posts[]> => {
  const res = await fetch("http://qiita.com/api/v2/items?query=user:taurosuke&per_page=100");
  if (!res.ok) throw new Error(`データ取得に失敗しました ${res.statusText}`);
  return res.json() as Promise<Posts[]>;
};

function PageClient({ limit }: Props) {
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

  const [searchWord, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // const totalPages = Math.ceil(postsData.length / limit);

  const filteredPosts = useMemo(
    () => postsData.filter((post) => post.title.toLowerCase().includes(searchWord.toLowerCase())),
    [postsData, searchWord]
  );

  const totalPages = Math.ceil(filteredPosts.length / limit);

  const pageItems = useMemo(
    () => filteredPosts.slice((currentPage - 1) * limit, currentPage * limit),
    [filteredPosts, currentPage, limit]
  );

  // const pageItems = useMemo(
  //   () => postsData.slice((currentPage - 1) * limit, currentPage * limit),
  //   [postsData, currentPage, limit]
  // );

  console.log(pageItems);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>エラーが発生しました</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between mt-4 mb-4 ml-10">
        <div className="qiita-heading text-xl font-bold">個人記事一覧</div>
        <div>
          <label className="font-bold mr-2">検索</label>
          <input
            className="border rounded-md bg-white p-2"
            placeholder="　検索タイトルを入力..."
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div>
          <Link
            href="/"
            className="btn mr-10 c-btn-slide2 px-6 py-2 font-bold text-[#fff] bg-[#419400] border border-[#419400] rounded">
            戻る
          </Link>
        </div>
      </div>

      <div className="grid justify-items-center md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 2xl:grid-row-2">
        {pageItems.map((posts: Posts) => {
          return (
            <Link href={posts.url} key={posts.id} className="image-animation card bg-base-100 w-96 shadow-lg">
              <figure>
                <Image src={QiitaThumbnail} alt="画像" width={400} height={300} priority={true} />
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
          <QiitaClientSidePagenation currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </>
  );
}

export default PageClient;
