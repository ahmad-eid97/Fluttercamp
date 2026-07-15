//= Components
import Container from "@mui/material/Container";
import CompanySection from "./Company";
import Services from "./Services";
import AboutVideo from "./AboutVideo";
import Team from "./Team";
//= Types
import { Dictionary } from "@/types";

type Props = {
  dictionary: Dictionary;
}

function AboutWrapper({ dictionary }: Props) {
  return (
    <>
      {/* @ts-ignore */}
      <Container maxWidth="xxl">
        <CompanySection dictionary={dictionary} />
      </Container>
      <Services dictionary={dictionary} />
      {/* @ts-ignore */}
      <Container maxWidth="xxl">
        <AboutVideo />
        <Team dictionary={dictionary} />
      </Container>
    </>
  )
}

export default AboutWrapper;