import Header from "../components/Header";
import { BlogResponse } from "../../../types";

import PageClient from "./page.client";

const CmsUrl = process.env.NEXT_PUBLIC_CMS_URL;
const CmsApiKey = process.env.NEXT_PUBLIC_CMS_API_KEY;

async function page() {
  const fetchAllBlogsData = async (): Promise<BlogResponse> => {
    const res = await fetch(`${CmsUrl}/api/v1/blogs`, {
      next: { revalidate: 600 },
      headers: {
        "X-MICROCMS-API-KEY": `${CmsApiKey}`,
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

export default page;
