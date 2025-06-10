"use client";

import Link from "next/link";
import Image from "next/image";

import { CmsThumbnail } from "@/app/components/CmsThumbnail";
import { formattedDate } from "@/app/utils/formattedDate";

type Blog = {
  id: string;
  createdAt: string;
  content: string;
  title: string;
};

function PageClient({ detailBlogData }: { detailBlogData: Blog }) {
  return (
    <>
      <div className="justify-self-end">
        <Link
          href="/blogs"
          className="btn mr-10 c-btn-slide4 px-6 py-2 font-bold text-[#fff] bg-[#5696e3] border border-[#5696e3] rounded">
          戻る
        </Link>
      </div>

      <div className="max-w-2xl mx-auto mb-5">
        <div className="card bg-base-100 shadow rounded">
          <figure>
            <Image src={CmsThumbnail} alt="画像" width={700} height={600} priority={true} />
          </figure>
          <div className="card-body bg-base-content/5">
            <span className="w-fit border-b">公開日：{formattedDate(detailBlogData.createdAt)}</span>
            <h2 className="card-title">{detailBlogData.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: detailBlogData.content }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageClient;
