"use server"

export async function getLessonCompletionStatusAction(lessonId: string, clerkId: string) {
   try {
      return await getLessonCompletionStatus(lessonId, clerkId)

   } catch(error) {
      console.error("Error checking lesson completition status:", error);
      return false;
   }
}
