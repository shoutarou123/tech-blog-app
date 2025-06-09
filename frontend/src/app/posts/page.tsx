import Header from "../components/Header";
import QiitaPostsPage from "../components/QiitaPostsPage";

export default async function Page() {
  return (
    <>
      <Header />
      <div className="mb-2">
        <QiitaPostsPage limit={8} />
      </div>
    </>
  );
}
