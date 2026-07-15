//= Components
import Container from "@mui/material/Container";
import Search from "./Search";
import Practice from "./Practice";
import Topics from './Topics';
//= Types
import { Category } from "@/types";

type Props = {
  categories: Category[];
}

function LibraryWrapper({ categories }: Props) {
  return (
    // @ts-ignore
    <Container maxWidth="xxl">
      <Search />
      <Topics categories={categories} />
    </Container>
  );
}

export default LibraryWrapper;