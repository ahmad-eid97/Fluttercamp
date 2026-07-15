"use client";
import { useRouter } from "next/navigation";
//= Components
import { Icon } from "@iconify/react";
import { icons } from "@/lib/icons";
//= Utils
import { dateFormatter } from "@/utils/formatters";
import getImageUrl from "@/utils/getImageUrl";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import type { ArticlePost } from "@/types";
//= Styles
import cls from "./blog.module.scss";

type Props = {
  blog: ArticlePost;
};

function BlogCard({ blog }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.home.blogs;
  const router = useRouter();

  return (
    <article className={cls.blogCard} onClick={() => router.push(`/blog/${blog.id}`)}>
      <div className={cls.cardImg}>
        <img src={getImageUrl(blog.image || '')} alt={blog.title} />
        <span className={cls.tag}>{translations.show}</span>
      </div>
      <div className={cls.cardBody}>
        <h3>{blog.title}</h3>
        <div
          className={cls.excerpt}
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
        <div className={cls.meta}>
          <span className={cls.author}>
            <Icon icon={icons.user} /> {blog.author.full_name}
          </span>
          <span className={cls.date}>
            <Icon icon={icons.clock} />
            {dateFormatter({ date: (+blog.created_at * 1000), locale: 'ar' })}
          </span>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
