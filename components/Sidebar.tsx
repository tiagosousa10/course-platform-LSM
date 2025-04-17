"use client"

import { GetCompletionsQueryResult, GetCourseByIdQueryResult, Module } from "@/sanity.types";
import { usePathname } from "next/navigation";
import { useSidebar } from "./providers/SidebarProvider";
import { useEffect, useState } from "react";
import { calculateCourseProgress } from "@/lib/courseProgress";

interface SidebarProps {
   course: GetCourseByIdQueryResult;
   completedLessons?: GetCompletionsQueryResult["completedLessons"];
}

export function Sidebar({course, completedLessons = []} : SidebarProps) {
   const pathname = usePathname();
   const {isOpen, toggle, close} = useSidebar();
   const [openModules, setOpenModules] = useState<string[]>([])

   useEffect(() => {
      if(pathname && course?.modules) {
         const currentModuleId = course.modules.find(
            (module) => module.lessons?.some((lesson) => pathname === `/dashboard/courses/${course._id}/lessons/${lesson._id}`)
         )?._id;

         if(currentModuleId && !openModules.includes(currentModuleId)) {
            setOpenModules((prev) => [...prev, currentModuleId])
         }
      }
   }, [pathname, course, openModules])



   if(!course) return null;

   const progress = calculateCourseProgress(
      course.modules as unknown as Module[],
      completedLessons
   )
   return(
      <div>Sidebar</div>
   )
}

export default Sidebar;
