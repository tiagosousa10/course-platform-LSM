import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const MyCoursesPage = async() => {
   const user = await currentUser()

   if(!user?.id) {
      return redirect("/")
   }
  return (
    <div>MyCoursesPage</div>
  )
}

export default MyCoursesPage
