import Header from "@/app/components/Header";
import React from "react";
import { BlogResponse } from "../../../../types";

const CmsUrl = process.env.NEXT_PUBLIC_CMS_URL;
const CmsApiKey = process.env.NEXT_PUBLIC_CMS_API_KEY;

type Props = {
  id: string;
};

async function Page({ params }: { params: Props }) {
  const { id } = params;
  if (!id) {
    return <div>User ID is required</div>
  }
    const res = await fetch(`${CmsUrl}/api/v1/blogs/${id}`, {
      cache: "no-store",
      headers: {
        "X-MICROCMS-API-KEY": `${CmsApiKey}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("データ取得に失敗しました");
    const detailBlogData: BlogResponse = await res.json();

  return (
    <div>
      <Header />
      {detailBlogData?.contents.map((blog) => {
        return <div key={blog.id}>{blog.content}</div>;
      })}
    </div>
  );
}

export default Page;
