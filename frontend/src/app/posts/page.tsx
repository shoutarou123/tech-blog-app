import { Posts } from "../../../types";
import Link from "next/link";
import Header from "../components/Header";
import QiitaPostsPage from "../components/QiitaPostsPage";


export default async function page() {
    // const res = await fetch("/api/rails/postgres/");
    // const res = await fetch("http://localhost:3001/api/rails/qiita/all/", { cache: 'force-cache'});
   const res = await fetch("https://qiita.com/api/v2/items?query=user:taurosuke&per_page=100", { cache: 'force-cache' });

    if (!res.ok) throw new Error("全データ取得に失敗しました");
    const allPostsData: Posts[] = await res.json();
    console.log(allPostsData);
  return (
    <>
      <Header>
        <Link href="/" className="btn btn-primary text-gray-100 mr-10">
          戻る
        </Link>
      </Header>
      <QiitaPostsPage allPostsData={allPostsData} />
    </>
  );
}

