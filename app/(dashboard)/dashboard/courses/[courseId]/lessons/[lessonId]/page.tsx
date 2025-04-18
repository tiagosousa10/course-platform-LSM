import React from 'react'
import { getLessonById } from '@/sanity/lib/lessons/getLessonById'
import { currentUser } from '@clerk/nextjs/server'

interface LessonPageProps {
  params: Promise<{
    courseId: string,
    lessonId:string
  }>
}

const LessonPage = async({params} : LessonPageProps) => {
  const user = await currentUser();
  const { courseId, lessonId} = await params;

  const lesson = await getLessonById(lessonId);

  
  return (
    <div>LessonPage</div>
  )
}

export default LessonPage
