"use client";

export default function Error({ error }: { error: Error }) {
  const isQiitaError = error.message.includes("Qiita");
  const isCMSError = error.message.includes("CMS");

  return (
    <div>
      {isQiitaError && <p>Qiitaデータの取得に失敗しました</p>}
      {isCMSError && <p>CMSデータの取得に失敗しました</p>}
    </div>
  );
}
