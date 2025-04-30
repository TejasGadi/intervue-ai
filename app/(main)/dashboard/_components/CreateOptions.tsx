import { Phone, Video } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

const CreateOptions = () => {
  return (
    <div className='grid grid-cols-2 gap-5'>
        {/* Create new interview section */}
      <Link href={'/dashboard/create-interview'} className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer">
        <Video className='p-3 text-primary bg-gray-200 rounded-lg h-12 w-12 mb-1'/>
        <h2 className="font-bold">Create New Interview</h2>
        <p className="text-gray-500">Create AI Interviews and schedule them with Candidates</p>
      </Link>


      {/* Phone Screening section */}
      <div className="">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
        <Phone className='p-3 text-primary bg-gray-200 rounded-lg h-12 w-12 mb-1'/>
        <h2 className="font-bold">Create Phone Screening Call</h2>
        <p className="text-gray-500">Schdeule Phone Screening Call with Candidates</p>
      </div>
      </div>
    </div>
  )
}

export default CreateOptions
