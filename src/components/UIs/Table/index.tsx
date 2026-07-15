'use client';
import { useMemo, useState } from 'react';
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, SortingState, ColumnDef } from '@tanstack/react-table';
import { Icon } from '@iconify/react';
//= I18n
import useDictionary from "@/dictionaries/clientDictionary";
//= Styles
import cls from './table.module.scss';

interface Props<T> {
  tabledata: T[];
  columns: ColumnDef<T>[];
  searchPlaceholder?: string;
  showFilter?: boolean;
  showPerPage?: boolean;
  showPagination?: boolean;
  tableClassName?: string;
  paginationClassName?: string;
  paginationActiveClassName?: string;
  perPageClassName?: string;
}

function Table<U>({ tabledata, columns, searchPlaceholder, showFilter, showPerPage, showPagination, tableClassName, paginationClassName, paginationActiveClassName, perPageClassName }: Props<U>) {
  const { locale } = useDictionary();
  const data: U[] = useMemo(() => tabledata, [tabledata]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize
      },
      sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering
  });

  function goToPage(pageNumber: number) {
    setPageIndex(pageNumber);
  }

  function goToFirstPage() {
    setPageIndex(0);
  }

  function goToLastPage() {
    setPageIndex(table.getPageCount() - 1);
  }

  function goToNextPage() {
    setPageIndex(p => p + 1);
  }

  function goToPrevPage() {
    setPageIndex(p => p - 1);
  }

  return (
    <>
      {/* Search in table */}
      {
        showFilter &&
        <div className={cls.search}>
          <input type="text" placeholder={searchPlaceholder ? searchPlaceholder : 'Search on the table'} value={filtering} onChange={e => setFiltering(e.target.value)} />
        </div>
      }
      {/* Table */}
      <div className={cls.tableArea}>
        <table className={`${cls.table} ${tableClassName ? tableClassName : ''}`}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    {header.column.getIsSorted() === 'asc' && <Icon icon='fe:drop-down' />}
                    {header.column.getIsSorted() === 'desc' && <Icon icon='fe:drop-up' />}
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Page Size (Per Page) Option */}
        {
          showPerPage &&
          <div className={`${cls.perPage} ${perPageClassName ? perPageClassName : ''}`}>
            <label htmlFor="select">Page Size</label>
            <select id="select" defaultValue="10" onChange={e => setPageSize(+e.target.value)}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="60">60</option>
              <option value="80">80</option>
              <option value="100">100</option>
            </select>
          </div>
        }
        {/* Pagination */}
        {
          showPagination &&
          <div className={`${cls.pagination} ${paginationClassName ? paginationClassName : ''}`}>
            <button disabled={!table.getCanPreviousPage()} onClick={goToFirstPage}>
              {
                locale === 'ar' ?
                  <Icon icon='ri:skip-right-line' />
                  :
                  <Icon icon='ri:skip-left-line' />
              }
            </button>
            <button disabled={!table.getCanPreviousPage()} onClick={goToPrevPage}>
              {
                locale === 'ar' ?
                  <Icon icon='mingcute:right-line' />
                  :
                  <Icon icon='mingcute:left-line' />
              }
            </button>
            {
              new Array(table.getPageCount()).fill(0).map((_, i) => (
                <button key={i} onClick={() => goToPage(i)} className={pageIndex === i ? paginationActiveClassName ? paginationActiveClassName : cls.active : ''}>
                  {i + 1}
                </button>
              ))
            }
            <button disabled={!table.getCanNextPage()} onClick={goToLastPage}>
              {
                locale === 'ar' ?
                  <Icon icon='ri:skip-left-line' />
                  :
                  <Icon icon='ri:skip-right-line' />
              }
            </button>
            <button disabled={!table.getCanNextPage()} onClick={goToNextPage}>
              {
                locale === 'ar' ?
                  <Icon icon='mingcute:left-line' />
                  :
                  <Icon icon='mingcute:right-line' />
              }
            </button>
          </div>
        }
      </div>
    </>
  )
}

export default Table