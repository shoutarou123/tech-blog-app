import Link from "next/link";
import Header from "../components/Header";
import QiitaPostsPage from "../components/QiitaPostsPage";
import { fetchOgpImage } from "../lib/fetchOgpImage";
import { Posts } from "../../../types";

// type PageProps = {
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// };
const QiitaUrl = process.env.NEXT_PUBLIC_QIITA_URL;
const QiitaApi = process.env.NEXT_PUBLIC_QIITA_API_KEY;
export default async function Page() {
  // const resolvedSearchParams = await searchParams;
  // const currentPage = Number(resolvedSearchParams.p) || 1;
  // const limit = 4;
  // const path = "/posts";
  // const res = await fetch("/api/rails/postgres/");
  // const res = await fetch("http://localhost:3001/api/rails/qiita/all/", { cache: 'force-cache'});
  const fetchPage = async(pageNum: number) => {
    // 全記事（公開+限定公開）取得
    const resAuth = await fetch(`${QiitaUrl}/api/v2/authenticated_user/items?page=${pageNum}&per_page=50`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${QiitaApi}`
      },
      next: { revalidate: 600},
    });
    if (!resAuth.ok) {
      throw new Error(`データ取得に失敗しました: ${resAuth.status} ${resAuth.statusText}`);
    }
    return await (resAuth.json()) as Posts[];
  };

  // fetchの1ﾍﾟｰｼﾞ目と2ページ目を取得
  const [items1, items2] = await Promise.all([fetchPage(1), fetchPage(2)]);

  // 合体
  const allItems = [...items1, ...items2];

  // 公開記事だけ抽出
  const publicItems = allItems.filter(items => items.private === false)

  // const res = await fetch(`https://qiita.com/api/v2/items?query=user:taurosuke&page=${currentPage}&per_page=${limit}`, {
  //   cache: "force-cache",
  // });

  // if (!res.ok) throw new Error("全データ取得に失敗しました");
  // const allPostsData: Posts[] = await res.json();

  // const start = (currentPage - 1) * limit;
  // const end = start + limit;
  // const pageItems = publicItems.slice(start, end);

  // qiita画像取得
  const itemsWithOgp = await Promise.all(
    publicItems.map(async (posts) => ({
      ...posts,
      ogpImageUrl: await fetchOgpImage(posts.url), // 取得処理関数にurlを渡す
    }))
  );
  // const count = publicItems.length;
  // console.log("publicItems値", publicItems);

  return (
    <>
      <Header>
        <Link href="/" className="btn btn-primary text-gray-100 mr-10">
          戻る
        </Link>
      </Header>
      <QiitaPostsPage allPosts={itemsWithOgp} limit={4} />
    </>
  );
}
