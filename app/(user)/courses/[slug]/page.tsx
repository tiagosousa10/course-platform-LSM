import getCourseBySlug from "@/sanity/lib/courses/getCourseBySlug";
import { auth } from "@clerk/nextjs/server";

interface CoursePageProps {
   params: Promise<{slug: string}>
}

const CoursePage = async ({params} : CoursePageProps) => {
   const {slug} = await params;
   const courses = await getCourseBySlug(slug)
   const {userId} = await auth()


  return (
    <div>CoursePage {slug} </div>
  )
}

export default CoursePage
