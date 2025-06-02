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
    <div className="join flex justify-center mx-auto mt-4">
      <button className="join-item btn btn-square" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        ＜
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={"join-item btn btn-square" + (currentPage === number ? " text-white join-item btn btn-primary" : "")}>
          {number}
        </button>
      ))}
      <button
        className="join-item btn btn-square"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        ＞
      </button>
    </div>
  );
}
