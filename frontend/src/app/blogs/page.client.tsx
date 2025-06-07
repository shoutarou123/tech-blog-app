"use client";

import React, { useState } from 'react'
import { BlogResponse } from '../../../types';
import Link from 'next/link';
import Image from 'next/image';
import { CmsThumbnail } from '../components/CmsThumbnail';
import { formattedDate } from '../utils/formattedDate';
import ClientSidePagenation from '../components/ClientSidePagenation';

const limit = 8;

function PageClient({allBlogs}: {allBlogs: BlogResponse}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allBlogs.contents.length / limit);
  return (
    <div>
      <div className="grid justify-items-center md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 2xl:grid-row-2">
        {allBlogs.contents.map((blogs) => {
          return (
            <Link href="#" key={blogs.id} className="image-animation card bg-base-100 w-96 shadow-lg">
              <figure>
                <Image src={CmsThumbnail} alt="画像" width={400} height={300} priority={true} />
              </figure>
              <div className="card-body bg-base-content/5">
                <p>{formattedDate(blogs.createdAt)}</p>
                <h2 className="card-title">{blogs.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-3 items-center mt-4">
        <div></div>
        <div className="justify-self-center">
          <ClientSidePagenation currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

        <div className="justify-self-end">
          <Link
            href="/"
            className="btn mr-10 c-btn-slide2 px-6 py-2 font-bold text-[#fff] bg-[#419400] border border-[#419400] rounded">
            戻る
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageClient;
