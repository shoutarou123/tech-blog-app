"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { BlogResponse } from "../../../../types";
import { formattedDate } from "../../utils/formattedDate";
import { CmsThumbnail } from "../CmsThumbnail";

function Cms4BlogsPage({ cmsData }: { cmsData: BlogResponse }) {
  return (
    <>
      <div className="flex items-center justify-between mt-4 ml-10">
        <div className="cms-heading text-xl font-bold">ブログ記事</div>
        <div>
          <Link
            href="blogs"
            className="btn mr-10 justify-end c-btn-slide3 px-6 py-2 font-bold text-[#292929] bg-[#B1D9E9] border border-[#B1D9E9] rounded">
            もっと見る
          </Link>
        </div>
      </div>

      <div
        className="grid justify-items-center
    md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4">
        {cmsData.contents.map((blogs) => {
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
    </>
  );
}

export default Cms4BlogsPage;
