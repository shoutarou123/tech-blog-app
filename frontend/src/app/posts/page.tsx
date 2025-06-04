import Header from "../components/Header";
import QiitaPostsPage from "../components/QiitaPostsPage";

export default async function Page() {

  return (
    <>
      <Header />
      <QiitaPostsPage limit={4} />
    </>
  );
}
