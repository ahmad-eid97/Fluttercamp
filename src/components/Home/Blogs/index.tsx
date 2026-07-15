'use client';
import { useRouter } from "next/navigation";
import Link from "next/link";
//= Components
import Container from "@mui/material/Container";
import { Icon } from "@iconify/react";
import { SectionHeading, Button, Carousel } from "@/components/ui";
import { icons } from "@/lib/icons";
//= I18n
import useDictionary from "@/dictionaries/clientDictionary";
//= Utils
import { dateFormatter } from "@/utils/formatters";
import getImageUrl from "@/utils/getImageUrl";
//= Api
import { ArticlePost, Dictionary } from "@/types";
//= Styles
import cls from "./blogs.module.scss";

type Props = {
  dictionary: Dictionary;
  blogs: ArticlePost[];
}

function Blog({ dictionary, blogs }: Props) {
  const router = useRouter();
  const translations = dictionary.home.blogs;
  const { locale } = useDictionary();

  return (
    <section className={cls.latestCoursesBg}>
      <div className={cls.bgGrid} />
      <div className={cls.glow} />

      {/* @ts-ignore */}
      <div className={`${cls.latestCourses} container`}>
      <SectionHeading
        className={cls.heading}
        eyebrow={translations.latest}
        eyebrowIcon={icons.book}
        title={translations.latest}
      />
      <Carousel
        className={cls.carousel}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        perView={{ base: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
        gap={24}
        arrows
      >
        {blogs.map((blog, idx) => (
            <Link href={`/blog/${blog.id}`} className={cls.blogCard} key={idx}>
              <div className={cls.cardImg}>
                <img src={getImageUrl(blog.image || '')} alt={blog.title} />
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
            </Link>
        ))}
      </Carousel>
      <div className={cls.btn}>
        <Button variant="outline" size="lg" iconRight={icons.arrowRight} onClick={() => router.push('/blogs')}>
          {translations.showMore}
        </Button>
      </div>
      </div>
    </section>
  );
};

export default Blog;
