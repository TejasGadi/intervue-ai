import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calendar, CircleCheckBigIcon, Clock, Copy, List, Mail, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { toast } from 'sonner';

interface InterviewLinkProps {
  interview_id: string
  formData: {
    jobPosition: string;
    jobDescription: string;
    interviewDuration: string;
    type: string[];
  }
}

const InterviewLink: React.FC<InterviewLinkProps> = ({interview_id, formData}) => {
  const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id

  const getInterviewUrl = ()=>{
    return url
  }

  
  const onCopyLink=async()=>{
    await navigator.clipboard.writeText(url)
    toast("✅ Link copied to clipboard!")
  }

  return (
      <div className="flex flex-col flex-wrap items-center justify-center mt-10">
        <CircleCheckBigIcon className='w-[50] h-[50] text-green-600' />
        <h2 className="font-bold text-lg mt-3">
          You AI interview is ready!
        </h2>
        <p className="mt-3">
          Share this link with your candidates to start the interview process right away
        </p>
        <div className="w-full p-7 mt-5 rounded-lg bg-white">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Interview Link</h2>
            <h2 className="p-1 px-2 text-primary rounded-full bg-gray-100">Valid for 30 days</h2>
          </div>
          <div className="flex gap-4 mt-5">
            <Input defaultValue={getInterviewUrl()} />
            <Button className='cursor-pointer' onClick={onCopyLink}>
              <Copy/>
              Copy Link
            </Button>
          </div>
          <hr className="my-5"/>

          <div className="flex gap-5">
            <h2 className="text-sm text-gray-500 flex gap-2 items-center">
              <Clock className='w-4 h-4' />
              {formData?.interviewDuration} min
            </h2>
            <h2 className="text-sm text-gray-500 flex gap-2 items-center">
              <List className='w-4 h-4' />
              10 questions
            </h2>
            {/* <h2 className="text-sm text-gray-500 flex gap-2 items-center">
              <Calendar className='w-4 h-4' />
              {formData?.interviewDuration} min
            </h2> */}
          </div>
        </div>

        <div className="mt-7 p-5 rounded-lg bg-white w-full">
          <h2 className="text-sm text-bold">Share via</h2>
          <div className="mt-5 flex gap-10 justify-center flex-wrap">
            <Button variant={"outline"} className='' >
              <Mail/> Email
            </Button>
            <Button variant={"outline"} className='' >
              <Mail/> Slack
            </Button>
            <Button variant={"outline"} className='' >
              <Mail/> Whatsapp
            </Button>
          </div>
        </div>

        <div className="mt-7 mb-5 w-full flex justify-between">
          <Link href={'/dashboard'}>
            <Button className='cursor-pointer'>
              <ArrowLeft/> Back to Dashboard
            </Button>
          </Link>
          <Link href={'/create-interview'}>

            <Button className='cursor-pointer'>
              <Plus/>
              Create New Interview
            </Button>
          </Link>
        </div>
        
      </div>
  )
}

export default InterviewLink
