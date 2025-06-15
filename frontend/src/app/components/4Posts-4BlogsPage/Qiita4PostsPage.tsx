"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useQueryClient } from "@tanstack/react-query";
import { Posts } from "../../../../types";
import { QiitaThumbnail } from "../QiitaThumbnail";
import { formattedDate } from "@/app/utils/formattedDate";
import { fetchAllPosts } from "@/app/api/nextjs/qiita/api";

function Qiita4PostsPage({ itemsWithOgp }: { itemsWithOgp: Posts[] }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["allposts"],
      queryFn: fetchAllPosts,
      staleTime: 1000 * 60 * 10,
    });
  }, [queryClient]);

  return (
    <>
      <div className="flex items-center justify-between mt-4 ml-10">
        <div className="qiita-heading text-xl font-bold">個人記事</div>
        <div>
          <Link
            href="/posts"
            className="btn mr-10 justify-end c-btn-slide px-6 py-2 font-bold text-[#292929] bg-[#BDC000] border border-[#BDC000] rounded">
            もっと見る
          </Link>
        </div>
      </div>

      <div
        className="grid justify-items-center
    md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4">
        {itemsWithOgp.map((posts) => {
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
    </>
  );
}

export default Qiita4PostsPage;
