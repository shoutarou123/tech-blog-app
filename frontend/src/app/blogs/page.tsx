import Header from "../components/Header";
import { BlogResponse } from "../../../types";

import PageClient from "./page.client";


async function Page() {
  const fetchAllBlogsData = async (): Promise<BlogResponse> => {
    const res = await fetch(`https://xigjaxd0bx.microcms.io/api/v1/blogs`, {
      next: { revalidate: 600 },
      headers: {
        "X-MICROCMS-API-KEY": process.env.CMS_API_KEY || "",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("データ取得に失敗しました");
    return await res.json();
  };
  const allBlogs = await fetchAllBlogsData();

  return (
    <div>
      <Header />
      <PageClient allBlogs={allBlogs} />
      </div>
  );
}

export default Page;
