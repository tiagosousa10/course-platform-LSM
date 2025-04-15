"use server"

import stripe from "@/lib/stripe"
import baseUrl from "@/lib/baseUrl"
import getCourseById from "@/sanity/lib/courses/getCourseById"
import { clerkClient } from "@clerk/nextjs/server"
import { createStudentIfNotExists } from "@/sanity/lib/student/createStudentIfNotExists"
import { createEnrollment } from "@/sanity/lib/courses/createEnrollment"

export async function createStripeCheckout(courseId: string, userId: string) {
   const course = await getCourseById(courseId)
   const clerkUser = await (await clerkClient()).users.getUser(userId)

   const {emailAddresses, firstName, lastName, imageUrl} = clerkUser;
   const email = emailAddresses[0].emailAddress;

   if(!emailAddresses || !email) {
      throw new Error("User has no email address")
   }

   if(!course) {
      throw new Error("Course not found")
   }

   const user = await createStudentIfNotExists({
      clerkId:userId,
      email: email || "",
      firstName: firstName || email,
      lastName: lastName || "",
      imageUrl: imageUrl || "",
   })

   if(!user) {
      throw new Error("User not found")
   }


   //validade course data and prepare price for Stripe
   if(!course.price && course.price !== 0) {
      throw new Error("Course has no price")
   }

   const priceInCents = Math.round(course.price * 100)

   //if course is free, create enrollment and redirect to course page

   if(priceInCents === 0) {
      await createEnrollment({
         studentId: user._id,
         courseId: course._id,
         paymentId: "free",
         amount: 0,
      })
   }

}
