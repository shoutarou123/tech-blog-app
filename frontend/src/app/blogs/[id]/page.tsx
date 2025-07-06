import Header from "@/app/components/Header";
import PageClient from "./page.client";

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
  if (!id) {
    return <div>User ID is required</div>;
  }
  const fetchBlogData = async ():Promise<Blog> => {
    try {
      const res = await fetch(`https://xigjaxd0bx.microcms.io/api/v1/blogs/${id}`, {
        cache: "no-store",
        headers: {
          "X-MICROCMS-API-KEY": process.env.CMS_API_KEY || "",
          "Content-Type": "application/json",
        },
      });
      console.log("API_KEY", process.env.CMS_API_KEY?.slice(0,4) + "***");
      console.log("res.status:", res.status);
      if (!res.ok) throw new Error("ブログデータ取得に失敗しました");
      const data = await res.json();
      console.log("data:", data);
      return data;
    } catch (error) {
      console.error("エラーをcatch", error);
      throw error;
    }
  }
  const detailBlogData = await fetchBlogData();

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
