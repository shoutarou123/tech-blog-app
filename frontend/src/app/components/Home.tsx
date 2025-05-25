"use client";
import Link from 'next/link'

function Home() {
  return (
   <div className="bg-base-100 min-h-screen">
    <h1>Home</h1>
      <Link
        className="btn btn-primary"
        href="#"
        >
          ダミーボタン
      </Link>
    </div>
  )
}

export default Home
