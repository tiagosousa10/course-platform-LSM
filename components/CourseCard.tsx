import { GetCoursesQueryResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "./Loader";

interface CourseCardProps {
   course: GetCoursesQueryResult[number];
   progress?: number;
   href: string;
}

const CourseCard = ({course, progress, href}: CourseCardProps) => {
  return (
   <Link 
      href={href}
      prefetch={false}
      className="group hover:no-underline flex"
   >
      <div className="bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px] border border-border flex flex-col flex-1">
         <div className="relative h-52 w-full overflow-hidden">
         {course.image ? (
            <Image
              src={urlFor(course.image).url() || ""}
              alt={course.title || "Course Image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-muted">
              <Loader size="lg" />
            </div>
          )}
         </div>
      </div>
   </Link>
  )
}

export default CourseCard
