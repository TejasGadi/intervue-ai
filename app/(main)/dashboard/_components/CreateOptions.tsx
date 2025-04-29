import { Phone, Video } from 'lucide-react'
import React from 'react'

const CreateOptions = () => {
  return (
    <div className='grid grid-cols-2 gap-5'>
        {/* Create new interview section */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <Video className='p-3 text-primary bg-gray-200 rounded-lg h-12 w-12 mb-1'/>
        <h2 className="font-bold">Create New Interview</h2>
        <p className="text-gray-500">Create AI Interviews and schedule them with Candidates</p>
      </div>


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
