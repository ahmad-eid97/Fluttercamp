'use client';
//= Utils
import { Icon } from "@iconify/react";
import { dateFormatter } from "@/utils/formatters";
import getImageUrl from "@/utils/getImageUrl";
import { icons } from "@/lib/icons";
//= Types
import { ArticlePost } from '@/types';
//= Styles
import cls from './blog.module.scss';
import { Container } from "@mui/material";

type Props = {
  blog: ArticlePost | undefined;
}

function BlogDetails({ blog }: Props) {
  return (
    // @ts-ignore
    <Container maxWidth="xxl" className="container">
      <article className={cls.blogDetails}>
        <header className={cls.header}>
          <span className={cls.eyebrow}>
            <Icon icon={icons.book} />
            {blog?.author?.full_name}
          </span>
          <h1>{blog?.title}</h1>
          <div className={cls.meta}>
            <div className={cls.author}>
              <img src={blog?.author?.avatar || ''} alt={blog?.author?.full_name || 'author'} />
              <span>{blog?.author?.full_name}</span>
            </div>
            <span className={cls.dot} />
            <div className={cls.time}>
              <Icon icon={icons.calendar} />
              <span>{blog?.created_at ? dateFormatter({ date: (+blog?.created_at * 1000), locale: 'ar' }) : ''}</span>
            </div>
          </div>
        </header>

        <div className={cls.image}>
          <img src={getImageUrl(blog?.image)} alt={blog?.title || 'blog_image'} />
        </div>

        <div className={cls.content}>
          <div dangerouslySetInnerHTML={{ __html: blog?.description || '' }}></div>
          <div dangerouslySetInnerHTML={{ __html: blog?.content || '' }}></div>
        </div>
      </article>
    </Container>
  );
}

export default BlogDetails;
