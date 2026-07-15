//= Components
import CourseWrapper from "@/components/Course";
//= Api
import { getCourseById } from "@/api";
//= Utils
import { asyncHandler } from "@/utils/asyncHandler";

export async function generateMetadata() {
  return {
    title: `FlutterCamp - Course`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}

type Props = {
  params: Promise<{
    id: string;
  }>;
}

export default async function Course(props: Props) {
  const params = await props.params;

  const {
    id
  } = params;

  const course = await asyncHandler(() => getCourseById(+id));

  return (
    <main>
      <CourseWrapper course={course} />
    </main>
  );
}
