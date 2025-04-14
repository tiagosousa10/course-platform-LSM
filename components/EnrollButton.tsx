"use client"
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'

const EnrollButton = ({courseId, isEnrolled} : {courseId: string; isEnrolled: boolean}) => {

  const {user, isLoaded: isUserLoaded} = useUser()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleEnroll = async (courseId: string) => {

  }

  return (
    <button
      className={`w-full rounded-lg px-6 py-3 font-medium transition-all duration-300 ease-in-out relative h-12
        ${
          isPending || !user?.id
            ? "bg-gray-100 text-gray-400 cursor-not-allowed hover:scale-100"
            : "bg-white text-black hover:scale-105 hover:shadow-lg hover:shadow-black/10"
        }
      `}
      disabled={!user?.id || isPending}
      onClick={() => handleEnroll(courseId)}
    >
      {!user?.id ? (
        <span className={` cursor-pointer ${isPending ? "opacity-0" : "opacity-100"}`}>
          Sign in to Enroll
        </span>
      ) : (
        <span className={`cursor-pointer  ${isPending ? "opacity-0" : "opacity-100"}`}>
          Enroll Now
        </span>
      )}
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
}

export default EnrollButton
