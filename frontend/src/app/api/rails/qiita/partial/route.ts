import { NextResponse } from "next/server";

// Qiitaの自分の記事を取得する関数（Rails API）
export async function GET() {
  const res = await fetch("http://localhost:3000/api/v2/items/");
  const data = await res.json();
  return NextResponse.json(data);
};
