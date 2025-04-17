"use client"

import { GetCompletionsQueryResult, GetCourseByIdQueryResult, Module } from "@/sanity.types";
import { usePathname } from "next/navigation";
import { useSidebar } from "./providers/SidebarProvider";
import { useEffect, useState } from "react";
import { calculateCourseProgress } from "@/lib/courseProgress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { ChevronRight, Library } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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

   const SidebarContent = () => {
      return(
         <div>Sidebar</div>
      )
   }

   return(
      <>
      {/* thin mobile sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex flex-col items-center w-[60px] border-r bg-background lg:hidden py-4 gap-y-4">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/" prefetch={false}>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Library className="h-5 w-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Course Library</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggle}
                variant="ghost"
                size="icon"
                className="h-10 w-10"
              >
                <ChevronRight
                  className={cn(
                    "h-5 w-5 transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle Sidebar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </aside>


      {/* Main Sidebar - Desktop & Mobile */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-background transition-all duration-300 ease-in-out",
          "lg:z-50 lg:block lg:w-96 lg:border-r",
          isOpen
            ? "w-[calc(100%-60px)] translate-x-[60px] lg:translate-x-0 lg:w-96"
            : "translate-x-[-100%] lg:translate-x-0"
        )}
      >
        <div className="h-full">
          <SidebarContent />
        </div>
      </aside>

       {/* Overlay for mobile */}
       {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      )}
      
      </>
   )
}

export default Sidebar;
