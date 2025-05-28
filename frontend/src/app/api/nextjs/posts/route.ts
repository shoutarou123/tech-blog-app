import { NextResponse } from "next/server";

// post.jsonから全データ取得する関数
export async function GET() {
  const res = await fetch("http://localhost:3005/data", { cache: "no-store" });
  if (res.status === 404) {
    return new Response("Not Found", { status: 404 });
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  const posts = await res.json();
  return NextResponse.json(posts);
}
