"use client";

import Image from "next/image";

import { CmsThumbnail } from "@/app/components/CmsThumbnail";
import { formattedDate } from "@/app/utils/formattedDate";
import { useRouter } from "next/navigation";

type Blog = {
  id: string;
  createdAt: string;
  content: string;
  title: string;
};

function PageClient({ detailBlogData }: { detailBlogData: Blog }) {
  const router = useRouter();
  return (
    <>
      <div className="justify-self-end">
        <button
          onClick={() => router.back()}
          className="btn mr-10 c-btn-slide4 px-6 py-2 font-bold text-[#fff] bg-[#5696e3] border border-[#5696e3] rounded">
          戻る
        </button>
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
