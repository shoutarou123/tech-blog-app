"use client";
import React, { ReactNode } from 'react'

function Header({children}: {children: ReactNode}) {
  return (
      <div className="flex justify-between navbar bg-info shadow-sm mb-4">
        <h1 className="text-3xl font-bold ml-10">Tech-blog</h1>
        {children}
      </div>
  )
}

export default Header
