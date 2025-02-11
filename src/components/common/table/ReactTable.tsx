import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePagination } from "./UsePagination";
// import { perPageRecord } from "../../../helpers/utils";

interface Props {
  data: Array<object>;
  columns: any;
  perPage?: number;
  totalCount?: number;
  setPageSize?: any;
  setCurrentPage?: (e: number) => void;
  currentPage?: number;
  changePerPageRecords?: (e: number) => void;
  handlePageChange?: (e: number) => void;
};

type PaginationItem = number | string;

const ReactTable = (props: Props) => {
  const {
    data = [],
    columns = [],
    setPageSize = () => { },
    perPage = 10,
    totalCount = 0,
    setCurrentPage = () => { },
    currentPage = 1,
    changePerPageRecords = () => { },
    handlePageChange = () => { },
  } = props;

  const paginationRange: PaginationItem[] = (usePagination({
    currentPage,
    totalCount,
    perPage,
  }) || []) as PaginationItem[];

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount / perPage),
    onPaginationChange: setPageSize,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const pagesArr = [...new Array(table.getPageCount()).keys()];

  return (
    <>
      <div className="table-responsive">
        <table className="table common-table w-full h-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="w-full text-left ">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="font-medium text-base md:text-lg leading-5 md:leading-8 text-black text-opacity-50 px-2.5 md:px-5 py-2.5 md:py-4">
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t-[0.5px] border-light-gray-400  hover:bg-[#E9E9F2] group">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-2.5 md:px-5 py-2.5 md:py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <div>
                    No records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {data.length > 0 && (
        <div className="table-pagination">
          <div className="total-page-msg">
            {pagesArr.length > 0 && (
              <div>
                Showing{" "}
                {perPage * (currentPage - 1) + 1}{" "}
                to{" "}
                {(perPage * currentPage) < totalCount ? perPage * currentPage : totalCount}{" "}
                of {totalCount} entries
              </div>
            )}
          </div>
          <div>
            {pagesArr.length > 0 && (
              <div>
                <span className="record-msg"> Record per page</span>
                <div className="d-inline-block">
                  <select className=""
                    value={perPage}
                    onChange={(e) => changePerPageRecords(Number(e.target.value))}
                  >
                    {/* {perPageRecord().map((pageSize:any) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))} */}
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="pagination-main">
            {pagesArr.length > 0 && (
              <ul>
                <li>
                  <button
                    onClick={() => {
                      if (currentPage !== 1) {
                        setCurrentPage(Number(currentPage - 1));
                        handlePageChange(Number(currentPage - 1));
                      }
                    }}
                  >
                    <span className="custom-icon icon-arrow-left"></span>
                  </button>
                </li>

                {paginationRange?.map(
                  (pageNumber: string | number, i: number) => {
                    if (pageNumber === "...") {
                      return (
                        <li key={`active-${i}`}>
                          &#8230;
                        </li>
                      );
                    }
                    return (
                      <li
                        onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                          const target = e.target as HTMLLIElement;
                          setCurrentPage(Number(target.innerHTML));
                          handlePageChange(Number(target.innerHTML));
                        }}
                        className={`${pageNumber === currentPage ? "active" : ""}`}
                        key={`active-page-item-${i}`}
                      >
                        <button
                          aria-controls="example1"
                          data-dt-idx={pageNumber}
                          tabIndex={0}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    );
                  }
                )}
                <li style={{ cursor: "pointer" }}>
                  <button
                    onClick={() => {
                      if (currentPage !== pagesArr.length) {
                        setCurrentPage(Number(currentPage + 1));
                        handlePageChange(Number(currentPage + 1));
                      }
                    }}
                  >
                    <span className="custom-icon icon-arrow-right"></span>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReactTable;
