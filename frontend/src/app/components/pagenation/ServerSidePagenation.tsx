import React from "react";

type Props = {
  currentPage: number;
  limit: number;
  count: number;
  path: string;
};

export default function Pagenation({currentPage, limit, count, path}: Props) {
  const totalPages = Math.ceil(count / limit);
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages);
  } else if (currentPage >= totalPages - 2) {
    startPage = totalPages - 4;
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <a href={`${path}?p=${currentPage - 1}`} aria-label="Previous Page">
        <button
          className={`${
            currentPage === 1 || count < limit ? "cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          ＜
        </button>
      </a>
      {pageNumbers.map((number) => (
        <a key={number} href={`${path}?p=${number}`}>
          <button
            className={`${
              currentPage === number ? "bg-indigo-500 text-white" : ""
            }`}
          >
            {number}
          </button>
        </a>
      ))}
      <a href={`${path}?p=${currentPage + 1}`} aria-label="Next Page">
        <button
          className={`${
            currentPage === totalPages || count < limit ? "cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          ＞
        </button>
      </a>
    </div>
  );
};
