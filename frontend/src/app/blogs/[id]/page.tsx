import Header from "@/app/components/Header";
import React from "react";
import PageClient from "./page.client";

const CmsUrl = process.env.NEXT_PUBLIC_CMS_URL;
const CmsApiKey = process.env.NEXT_PUBLIC_CMS_API_KEY;

type Props = {
  id: string;
};

type Blog = {
  id: string;
  createdAt: string;
  content: string;
  title: string;
};

async function Page({ params }: { params: Promise<Props> }) {
  const { id } = await params;
  console.log("params:", params);
  if (!id) {
    return <div>User ID is required</div>;
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
  console.log("detailBlogData:", detailBlogData);
  console.log("detailBlogData.createdAt:", detailBlogData.createdAt);

  // const $ = cheerio.load(detailBlogData.content);
  // console.log('$:', $);
  // const imgSrcs = $('img').map((i, el) => $(el).attr('src')).get();
  // const imgConversionData = imgSrcs.forEach(src => fetchOgpImage(src));
  // const options = {
  //   preserveNewLines: true,
  //   wordwrap: 80,
  // }
  // const compiledConvert = compile(options);
  // const text = compiledConvert(imgConversionData as any)
  // const paragraphs = text
  // .split("\n")
  //   .filter(Boolean)
  //   .map((para, i) => {
  //     return <p key={i}>{para}</p>;
  //   });
  // console.log('imgSrcs:', imgSrcs);
  // console.log("$('img)の中身", $('img'));
  // const options = {
  //   preserveNewLines: true,
  //   wordwrap: 80,
  // }
  // const compiledConvert = compile(options);
  // const text = compiledConvert(detailBlogData.content);
  // const paragraphs = detailBlogData.content
  // .split("\n")
  // .filter(Boolean)
  // .map((para, i) => {
  //   return <p key={i}>{para}</p>;
  // });
  // cheerio.load(paragraphs);

  return (
    <div>
      <Header />
      <PageClient detailBlogData={detailBlogData} />
    </div>
  );
}

export default Page;
