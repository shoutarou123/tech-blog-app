"use client";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between navbar bg-[#83d4cc]/50 shadow-sm mb-4">
      <Link href="/" data-testid="nextlink" className="text-3xl font-bold ml-10 hover:opacity-70">
        Tech-blog
      </Link>
    </div>
  );
}

export default Header;
