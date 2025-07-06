import Header from "../components/Header";
import { BlogResponse } from "../../../types";

import PageClient from "./page.client";

async function Page() {
  const fetchAllBlogsData = async (): Promise<BlogResponse> => {
    try {
      const res = await fetch(`https://xigjaxd0bx.microcms.io/api/v1/blogs`, {
        next: { revalidate: 600 },
        headers: {
          "X-MICROCMS-API-KEY": process.env.CMS_API_KEY || "",
          "Content-Type": "application/json",
        },
      });
      console.log("API_KEY", process.env.CMS_API_KEY?.slice(0,4) + "***");
      console.log("res.status:", res.status);
      if (!res.ok) throw new Error("データ取得に失敗しました");
      const data = await res.json();
      console.log("data:",data);
      return data;
    } catch (error) {
      console.error("データ取得エラー", error);
      throw error;
    }
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
