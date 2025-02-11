import { useMemo } from "react";

interface Pagination {
  totalCount: number;
  currentPage: number;
  perPage: number;
}

export const usePagination: React.FC<Pagination> = ({
  totalCount,
  currentPage = 1,
  perPage = 10,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / perPage);

    if (totalPageCount === 1) {
      return [1];
    }

    if (totalPageCount === 2) {
      return [1, 2];
    }

    if (totalPageCount === 3) {
      return [1, 2, 3];
    }

    const range: Array<number | string> = [1];

    if (currentPage > 3) {
      range.push("...");
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPageCount - 1); i++) {
      range.push(i);
    }

    if (currentPage < totalPageCount - 2) {
      range.push("...");
    }

    range.push(totalPageCount);

    return range;
  }, [totalCount, currentPage, perPage]);

  return paginationRange;
};
