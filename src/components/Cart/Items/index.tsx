'use client';
import React from 'react';
import Link from 'next/link';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';
import Container from "@mui/material/Container";
import LoadingSkeleton from '@/components/UIs/Skeleton';
import { Button, EmptyState } from '@/components/ui';
//= Api
import { removeItem } from '@/api';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { CartItem } from '@/types';
//= Styles
import cls from './cart_items.module.scss';

type Props = {
  items: CartItem[] | undefined;
  refetch: () => Promise<void>;
  isLoading: boolean;
}


function CartItems({ items, refetch, isLoading }: Props) {
  async function handleRemoveItem(item_id: number) {
    const result = await confirmDialog({
      icon: 'question',
      title: "هل انت متأكد انك تريد حذف هذا العنصر ؟",
      showCancelButton: true,
      cancelButtonText: "إلغاء",
      confirmButtonText: "تأكيد الحذف",
    });

    if (result.isConfirmed) {
      const response = await removeItem(item_id);
      if (response?.success) {
        await refetch();
        toast.success("تم حذف العنصر بنجاح");
      }
    }
  }

  return (
    <div className={`${cls.cart_items} ${cls.ar}`}>
      <Container maxWidth="xl">
        {
          !isLoading && items && items.length ?
            <ul className={cls.list}>
              {items.map((item) => {
                const isSession = 'time' in item;
                return (
                  <li key={item.id} className={cls.item}>
                    <div className={cls.image}>
                      <img src={getImageUrl(item.image || '')} alt="image item" />
                    </div>

                    <div className={cls.meta}>
                      <p className={cls.title}>
                        {
                          isSession ?
                            item.title
                            :
                            <Link href={`/course/${item.info.id}`}>{item.title}</Link>
                        }
                      </p>
                      {
                        isSession &&
                        <span className={cls.date}>
                          <Icon icon="solar:calendar-bold-duotone" />
                          {item.time?.start} - {item.time?.end} ({item.timezone})
                        </span>
                      }
                      <p className={cls.instructor}>
                        بواسطة
                        <Link href={isSession ? `/user/${item.info.id}` : `/user/${item.info.teacher_id}`}>{item.teacher_name}</Link>
                      </p>
                    </div>

                    <p className={cls.price}>${item.price}</p>

                    <div className={cls.removeWrap}>
                      <Tooltip title="حذف" placement="top">
                        <button
                          type="button"
                          aria-label="حذف"
                          className={cls.remove}
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Icon icon="solar:trash-bin-trash-bold-duotone" />
                        </button>
                      </Tooltip>
                    </div>
                  </li>
                );
              })}
            </ul>
            :
            !isLoading ?
              <EmptyState
                className={cls.empty}
                illustration="/illustrations/empty-state.svg"
                title="لا توجد عناصر"
                description="سلة التسوق فارغة، تصفّح الدورات وأضف ما يناسبك."
                action={
                  <Button href="/courses" variant="primary" icon="solar:book-bookmark-bold-duotone">
                    تصفّح الدورات
                  </Button>
                }
              />
              :
              <div className={cls.skeletons}>
                <LoadingSkeleton width="100%" height="110px" rounded />
                <LoadingSkeleton width="100%" height="110px" rounded />
                <LoadingSkeleton width="100%" height="110px" rounded />
              </div>
        }
      </Container>
    </div>
  )
}

export default CartItems;
