"use client"

import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { getInterviewDetails, getSelectedInterviewDetails } from '@/app/actions/interview_crud_operations'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'

const Interview = () => {
  const {interview_id} = useParams()
  const [interviewData, setInterviewData] = useState<{
      jobPosition: string;
      jobDescription: string;
      interviewDuration: string;
      type: string[];
  }>()
 
  const [userName, setUserName] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext)
  const router = useRouter()

  const onJoinInterview=async()=>{
    setLoading(true)
    const interview = await getInterviewDetails(interview_id?.toString()!)
    setInterviewInfo({
      userName: userName,
      interviewData: interview?.question_list
    })
    router.push('/interview'+ '/' + interview_id + '/start')
    setLoading(false)
  }

  useEffect(()=>{
    try {
      setLoading(true)

      const asyncFunction = async()=>{
        const interview = await getSelectedInterviewDetails(interview_id?.toString()!)
        setInterviewData(interview!)
        if(interview == null){
          toast("❌ Incorrect Interview Link!")
        }
      }
      interview_id && asyncFunction()

      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast("❌ Incorrect Interview Link!")
    }
    
  }, [interview_id])

  return (
    <div className='mt-16 px-10 md:px-28 lg:px-48 xl:px-64'>
      <div className="flex flex-col justify-center items-center border rounded-lg bg-white p-7 lg:px-33 xl:px-52 pb-20">
        <Image src={'/intervue-ai-logo.png'} alt='logo' width={100} height={100} className='w-[140px]' />
        <h2 className="mt-3">AI-Powered Interview Platform</h2>
        <Image src={'/job-interview.webp'} alt='Job Interview Logo' width={500} height={500} className='w-[60%] my-6'/>

        <h2 className="font-bold text-2xl">{interviewData?.jobPosition}</h2>
        <h2 className="flex items-center gap-2 text-center text-gray-500 mt-3"><Clock className='h-4 w-4'/>{interviewData?.interviewDuration} min</h2>

        <div className="w-full">
          <h2 className="">Enter your full name</h2>
          <Input placeholder='e.g. John Smith' onChange={(event)=>setUserName(event.target.value)} />
        </div>

        <div className="p-3 bg-blue-200 flex gap-4 rounded-md mt-7">
          <Info className='text-blue-500'/>
          <div>
            <h2 className="font-bold">Before you begin</h2>
            <ul className="">
              <li className="text-sm text-blue-600">Test your camera and microphone</li>
              <li className="text-sm text-blue-600">Ensure you have a stable internet connection</li>
              <li className="text-sm text-blue-600">Find a quiet place for interview</li>
            </ul>
          </div>
        </div>

        <Button className='mt-8 w-full font-bold cursor-pointer' disabled={loading || !userName}
        onClick={()=>onJoinInterview()} >
          <Video/> {loading && <Loader2Icon/>}
          Join Interview
        </Button>
      </div>
    </div>
  )
}

export default Interview
