import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getEnrolledCourses } from '@/sanity/lib/courses/getEnrolledCourses'

const MyCoursesPage = async() => {
   const user = await currentUser()

   if(!user?.id) {
      return redirect("/")
   }

   const enrolledCourses = await getEnrolledCourses(user.id)

   //get progress for each enrolled course

   const coursesWithProgress = await Promise.all(
      enrolledCourses.map(async ({course}) => {
         if(!course) return null;
         return {

         }
      })
   )


  return (
    <div>MyCoursesPage</div>
  )
}

export default MyCoursesPage
