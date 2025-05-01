"use client"
import { Button } from '@/components/ui/button'
import { Camera, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const LatestInterviewsList = () => {
    const [interviewsList, setInterviewsList] = React.useState([])
    const router = useRouter()
  return (
      <div className="my-5">
        <h2 className="font-bold text-2xl mb-3">
            Previously Created Interviews
        </h2>
        {
            interviewsList.length == 0 &&
            (
                <div className="p-5 flex flex-col gap-3 items-center bg-white rounded-lg">
                    <Video className='h-10 w-10 text-primary'/>
                    <h2 className="">
                        You don't have any interview created!
                    </h2>
                    <Button className='cursor-pointer' onClick={() => router.push('/dashboard/create-interview')}>
                        Create New Interview
                    </Button>
                </div>
            )
        }
      </div>
  )
}

export default LatestInterviewsList
