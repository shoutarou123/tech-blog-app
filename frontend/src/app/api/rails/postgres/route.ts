import { NextResponse } from "next/server";

// Rails側のpostgresqlに保存したデータ全てを取得する関数
export async function GET() {
  const res = await fetch("http://localhost:3000/api/v1/posts");
  if (res.status === 404) {
    return new Response("Not Found", { status: 404 });
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch pasts: ${res.status}`);
  }
  const posts = await res.json();
  return NextResponse.json(posts);
};
