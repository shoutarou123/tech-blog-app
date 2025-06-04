"use client";
import Link from 'next/link';

function Header() {
  return (
      <div className="flex justify-between navbar bg-info shadow-sm mb-4">
        <Link href="/" className="text-3xl font-bold ml-10">Tech-blog</Link>
      </div>
  )
}

export default Header
