"use server"

import stripe from "@/lib/stripe"
import baseUrl from "@/lib/baseUrl"
import getCourseById from "@/sanity/lib/courses/getCourseById"
import { clerkClient } from "@clerk/nextjs/server"

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
}
