import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function ClientSidePagenation({ currentPage, totalPages, onPageChange }: Props) {
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
    <div className="join flex justify-center mx-auto">
      <button className="join-item btn" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        ＜
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={"join-item btn" + (currentPage === number ? "bg-indigo-500 text-white" : "")}>
          {number}
        </button>
      ))}
      <button
        className="join-item btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        ＞
      </button>
    </div>
  );
}
