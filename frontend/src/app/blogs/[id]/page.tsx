import Header from "@/app/components/Header";
import React from "react";

const CmsUrl = process.env.NEXT_PUBLIC_CMS_URL;
const CmsApiKey = process.env.NEXT_PUBLIC_CMS_API_KEY;

type Props = {
  id: string;
};

type Blog = {
  id: string;
  createAt: string;
  content: string;
  title: string;
}

async function Page({ params }: { params: Props }) {
  const { id } = await params;
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
    const detailBlogData: Blog = await res.json();
    console.log('detailBlogData', detailBlogData);
  return (
    <div>
      <Header />
      {detailBlogData.content}
    </div>
  );
}

export default Page;
