"use client";
import Link from 'next/link';
import React, { ReactNode } from 'react'

function Header({children}: {children: ReactNode}) {
  return (
      <div className="flex justify-between navbar bg-info shadow-sm mb-4">
        <Link href="/" className="text-3xl font-bold ml-10">Tech-blog</Link>
        {children}
      </div>
  )
}

export default Header
