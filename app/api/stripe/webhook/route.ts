import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStudentByClerkId } from "@/sanity/lib/student/getStudentByClerkId";
import { createEnrollment } from "@/sanity/lib/courses/createEnrollment";
import stripe from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;


export async function POST(req: Request) {
   const body = await req.text()
   const headersList = await headers();
   const signature = headersList.get("stripe-signature");

   if(!signature) {
      return new NextResponse("Missing Stripe signature", {status: 400})
   }

   let event: Stripe.Event;

   try {
      event = stripe.webhooks.constructEvent(
         body,
         signature,
         webhookSecret
      )

   } catch(error: unknown) {
      const errorMessage = 
         error instanceof Error ? error.message : "Failed to create checkout session";
      console.log("Webhook signature verification failed:", errorMessage);

         return new NextResponse(errorMessage, {status: 400});

   }

   // handle the checkout.session.completed event
   switch(event.type) {
      case "checkout.session.completed":
         const session = event.data.object as Stripe.Checkout.Session; // means -> checkout.session.completed

         //get the courseId and userId from the metadata
         const courseId = session.metadata?.courseId;
         const userId = session.metadata?.userId;

         if(!courseId || !userId) {
            return new NextResponse("Missing metadata", {status: 400})
         }

         const student = await getStudentByClerkId(userId);

         if(!student) {
            return new NextResponse("Student not found", {status: 400})
         }

         break;
   }
  
}
