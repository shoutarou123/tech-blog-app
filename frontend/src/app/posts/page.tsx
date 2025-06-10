import Header from "../components/Header";
import PageClient from "./page.client";

export default async function Page() {
  return (
    <>
      <Header />
      <div className="mb-2">
        <PageClient limit={8} />
      </div>
    </>
  );
}
