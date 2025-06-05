"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect} from "react";
import { Posts } from "../../../types";
import { formattedDate } from "../utils/formattedDate";
import { useQueryClient } from "@tanstack/react-query";

const thumbnail =
  "https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9SmF2YVNjcmlwdCVFMyU4MSVBN1VSTCVFMyU4MSU4QiVFMyU4MiU4OU9HUCVFNSU4RiU5NiVFNSVCRSU5NyVFMyU4MSU5OSVFMyU4MiU4QiZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1jbGlwPWVsbGlwc2lzJnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9NDM5YjY5NjY3Nzg3ZTExYzdmYTM2YjI1ZDg3NTcyN2Y&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwa3N5dW5ubm4mdHh0LWNvbG9yPSUyMzIxMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZzPWUxMjJhOTA1NDdiNTMzNDI4MWY3YmU0M2U2Y2I1M2Rh&blend-x=142&blend-y=491&blend-mode=normal&s=1a611f7e8833ff640580434a1b03d27a";

const fetchAllPosts = async () => {
  const res = await fetch("https://qiita.com/api/v2/items?query=user:taurosuke&per_page=100");
  if (!res) throw new Error(`データ取得に失敗しました`);
  return await res.json();
};

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
    <div>
      <div
        className="grid justify-items-center
    md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {itemsWithOgp.map((posts) => {
          return (
            <Link href={posts.url} key={posts.id} className="image-animation card bg-base-100 w-96 shadow-lg">
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
      <div className="flex justify-end mt-4">
        <Link
          href="/posts"
          className="btn mr-10 justify-end c-btn-slide px-6 py-2 font-bold text-[#292929] bg-[#BDC000] border border-[#BDC000] rounded">
          もっと見る
        </Link>
      </div>
    </div>
  );
}

export default Qiita4PostsPage;
