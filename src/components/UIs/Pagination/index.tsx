'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= I18n
import useDictionary from "@/dictionaries/clientDictionary";
//= Styles
import cls from './pagination.module.scss';

type Props = {
  paginationClassName?: string;
  paginationActiveClassName?: string;
  pagesCount: number;
  currentPage: number;
  onGoToFirstPage?: () => void;
  onGoToPrevPage?: () => void;
  onGoToLastPage?: () => void;
  onGoToNextPage?: () => void;
  onGoToPage?: (i: number) => void;
  pageInUrlKey?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  refetch?: (appliedFilters?: { [key: string]: string | number }) => Promise<void>;
}

function Pagination({
  pagesCount,
  currentPage,
  paginationClassName,
  paginationActiveClassName,
  onGoToFirstPage,
  onGoToPrevPage,
  onGoToLastPage,
  onGoToNextPage,
  onGoToPage,
  pageInUrlKey,
  isDisabled,
  isLoading,
  refetch
}: Props) {
  // const { locale } = useDictionary();
  const locale = 'ar';
  const [pageIndex, setPageIndex] = useState<number>(currentPage);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    handleRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    checkURLSearchParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleChangeURL(pageIndex + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  async function checkURLSearchParams() {
    const currentPageInUrl = searchParams.get(pageInUrlKey || 'page');
    const index = currentPageInUrl ? +currentPageInUrl - 1 : -1;
    if (index >= 0 && index !== pageIndex) setPageIndex(index);
  }

  function handleChangeURL(newPageIndex: number) {
    const currentPageInUrl = searchParams.get(pageInUrlKey || 'page');
    const index = currentPageInUrl ? +currentPageInUrl - 1 : -1;
    if (index === -1 && newPageIndex === 1) return;

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set(pageInUrlKey || 'page', newPageIndex.toString() || '1');
    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.replace(`${pathname}${query}`);
  }

  async function handleRefetch() {
    if (isUpdating && refetch) {
      const currenPageInUrl = searchParams.get(pageInUrlKey || 'page');
      await refetch({ page: currenPageInUrl ? +currenPageInUrl : 1 });
      setIsUpdating(false);
    } else {
      setIsUpdating(false);
    }
  }

  function handleGoToPage(i: number) {
    setIsUpdating(true);
    if (onGoToPage) {
      onGoToPage(i);
      setPageIndex(i);
    } else {
      setPageIndex(i);
    }
  }

  function handleGoToNextPage() {
    setIsUpdating(true);
    pageIndex < pagesCount - 1 && setPageIndex(pageIndex + 1);
    if (onGoToNextPage) onGoToNextPage();
  }

  function handleGoToPrevPage() {
    setIsUpdating(true);
    pageIndex > 0 && setPageIndex(pageIndex - 1);
    if (onGoToPrevPage) onGoToPrevPage();
  }

  function handleGoToFirstPage() {
    setIsUpdating(true);
    setPageIndex(0);
    if (onGoToFirstPage) onGoToFirstPage();
  }

  function handleGoToLastPage() {
    setIsUpdating(true);
    setPageIndex(pagesCount - 1);
    if (onGoToLastPage) onGoToLastPage();
  }

  return (
    !isLoading ?
      <div className={`${cls.pagination} ${locale === 'ar' ? cls.ar : ''} ${paginationClassName ? paginationClassName : ''}`}>
        {
          isUpdating &&
          <p className={cls.loading}><Icon icon="line-md:loading-loop" /></p>
        }
        <button disabled={pageIndex === 0 || isDisabled} onClick={handleGoToFirstPage}>
          {
            locale === 'ar' ?
              <Icon icon='ri:skip-right-line' />
              :
              <Icon icon='ri:skip-left-line' />
          }
        </button>
        <button disabled={pageIndex === 0 || isDisabled} onClick={handleGoToPrevPage}>
          {
            locale === 'ar' ?
              <Icon icon='mingcute:right-line' />
              :
              <Icon icon='mingcute:left-line' />
          }
        </button>
        {
          new Array(pagesCount).fill(0).map((_, i) => (
            <button
              key={i}
              onClick={() => handleGoToPage(i)}
              className={pageIndex === i ? paginationActiveClassName ? paginationActiveClassName : cls.active : ''}
              disabled={isDisabled}
            >
              {i + 1}
            </button>
          ))
        }
        <button disabled={pageIndex === pagesCount - 1 || isDisabled} onClick={handleGoToNextPage}>
          {
            locale === 'ar' ?
              <Icon icon='mingcute:left-line' />
              :
              <Icon icon='mingcute:right-line' />
          }
        </button>
        <button disabled={pageIndex === pagesCount - 1 || isDisabled} onClick={handleGoToLastPage}>
          {
            locale === 'ar' ?
              <Icon icon='ri:skip-left-line' />
              :
              <Icon icon='ri:skip-right-line' />
          }
        </button>
      </div>
      :
      <LoadingSkeleton width="100%" height="70px" rounded />
  )
}

export default Pagination;
