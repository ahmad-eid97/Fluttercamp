//= Components
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import BlogCard from "./BlogCard";
import { SectionHeading } from "@/components/ui";
import { icons } from "@/lib/icons";
//= Types
import { ArticlePost, Dictionary } from "@/types";
//= Styles
import cls from './blogs.module.scss';

type Props = {
  dictionary: Dictionary;
  blogs: ArticlePost[];
}

function BlogsWrapper({ dictionary, blogs }: Props) {
  const translations = dictionary.blogs

  return (
    // @ts-ignore
    <Container maxWidth="xxl" className="container">
      <div className={cls.header}>
        <SectionHeading
          eyebrowIcon={icons.book}
          eyebrow={translations.title}
          title={translations.title}
        />
      </div>
      <Grid container spacing={3}>
        {blogs.map((blog, idx) => (
          <Grid
            key={idx}
            size={{
              xs: 12,
              sm: 6,
              lg: 4
            }}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default BlogsWrapper;
