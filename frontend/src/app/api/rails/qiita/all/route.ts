import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:3000/api/v2/items/all");
  const data = await res.json();
  return NextResponse.json(data);
}
