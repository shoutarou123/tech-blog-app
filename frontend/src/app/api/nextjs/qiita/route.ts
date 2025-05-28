import { NextResponse } from "next/server";

const qiitaUrl = process.env.NEXT_PUBLIC_QIITA_URL;
const qiitaApiKey = process.env.NEXT_PUBLIC_QIITA_API_KEY;

// Qiitaの自分の記事を取得する関数 (Nextjs API)
export async function GET() {
  const res = await fetch(`${qiitaUrl}/api/v2/items?query=user:taurosuke&per_page=4`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${qiitaApiKey}`,
    },
  });
  if (!res.ok) {
    throw new Response(`Failed to fetch ${res.statusText}`, { status: res.status});
  }
  const post = await res.json();
  return NextResponse.json(post);
};
