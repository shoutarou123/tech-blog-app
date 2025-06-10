"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { BlogResponse } from "../../../types";
import { CmsThumbnail } from "../components/CmsThumbnail";
import { formattedDate } from "../utils/formattedDate";
import CmsClientSidePagenation from "../components/pagenation/CmsClientSidePagenation";

const limit = 8;

function PageClient({ allBlogs }: { allBlogs: BlogResponse }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allBlogs.contents.length / limit);
  return (
    <>
      <div className="flex items-center justify-between mt-4 mb-4 ml-10">
        <div className="cms-heading text-xl font-bold">ブログ記事一覧</div>
        <div>
          <Link
            href="/"
            className="btn mr-10 c-btn-slide4 px-6 py-2 font-bold text-[#fff] bg-[#5696e3] border border-[#5696e3] rounded">
            戻る
          </Link>
        </div>
      </div>

      <div className="grid justify-items-center md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 2xl:grid-row-2">
        {allBlogs.contents.map((blogs) => {
          return (
            <Link
              href={`/blogs/${blogs.id}`}
              key={blogs.id}
              className="image-animation card bg-base-100 w-96 shadow-lg">
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
          <CmsClientSidePagenation currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </>
  );
}

export default PageClient;
