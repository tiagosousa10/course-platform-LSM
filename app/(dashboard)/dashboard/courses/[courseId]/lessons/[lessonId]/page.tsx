import React from 'react'
import { getLessonById } from '@/sanity/lib/lessons/getLessonById'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { PortableText } from 'next-sanity'
import { VideoPlayer } from '@/components/VideoPlayer'
import { LoomEmbed } from '@/components/LoomEmbed'

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

  if(!lesson) {
    return redirect(`/dashboard/courses/${courseId}`)
  }
  
  return (
    <div className='h-full flex flex-col overflow-hidden'>
      <div className='flex-1 overflow-y-auto'>
        <div className='max-w-4xl mx-auto pt-12 pb-20 px-4'>
          <h1 className='text-2xl font-bold mb-4'>{lesson.title}</h1>

          {lesson.description && (
            <p className='text-muted-foreground mb-8'>{lesson.description}</p>
          )}

          <div className='space-y-8'>
            {/* video section */}
            {lesson.videoUrl && (
              <VideoPlayer url={lesson.videoUrl} />
            )}

            {/*loom embed video if loomurl is provided */}
            {lesson.loomUrl && (
              <LoomEmbed shareUrl={lesson.loomUrl} />
            )}


            {/* lesson content */}
            {lesson.content && (
              <div>
                <h2 className='text-xl font-semibold mb-4'>Lesson Notes</h2>
                <div className='prose prose-blue dark:prose-invert max-w-none'>
                  <PortableText value={lesson.content} />
                </div>
              </div>
            )}

            <div className='flex justify-end'>
              {/* <LessonCompleteButton lessonId={lesson._id} clerkId={user!.id} /> */}

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default LessonPage
