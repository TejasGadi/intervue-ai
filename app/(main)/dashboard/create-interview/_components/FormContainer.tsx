"use client";
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { InterviewType } from '@/services/Constants'

interface FormContainerProps {
    onHandleInputChange: (field: string, value: any) => void
    GoToNext: ( field: void ) => void
}

const FormContainer: React.FC<FormContainerProps> = ({ onHandleInputChange, GoToNext }) => {
  const [interviewType, setInterviewType] = useState<string[]>([])

  useEffect(() => {
    // only fire when there's at least one selected type
    if (interviewType.length > 0) {
      onHandleInputChange('type', interviewType)
    }
  }, [interviewType])

  const AddInterviewType = (type: string) => {
    const data = interviewType.includes(type);
    if(!data){
        setInterviewType(prev => [...prev, type])
    }else{
        const result = interviewType.filter((item) => item !== type);
        setInterviewType(result)
    }
  }

  return (
    <div className='p-5 bg-white rounded-2xl'>
      {/* Job Position */}
      <div>
        <h2 className='text-sm font-medium'>Job Position</h2>
        <Input
          placeholder='e.g. Full Stack Developer'
          className='mt-2'
          onChange={e => onHandleInputChange('jobPosition', e.target.value)}
        />
      </div>

      {/* Job Description */}
      <div className='mt-5'>
        <h2 className='text-sm font-medium'>Job Description</h2>
        <Textarea
          placeholder='Enter detailed job description'
          className='h-[200px] mt-2'
          onChange={e => onHandleInputChange('jobDescription', e.target.value)}
        />
      </div>

      {/* Interview Duration */}
      <div className='mt-5'>
        <h2 className='text-sm font-medium'>Interview Duration</h2>
        <Select onValueChange={v => onHandleInputChange('interviewDuration', v)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 Min</SelectItem>
            <SelectItem value="15">15 Min</SelectItem>
            <SelectItem value="30">30 Min</SelectItem>
            <SelectItem value="45">45 Min</SelectItem>
            <SelectItem value="60">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div className='mt-5'>
        <h2 className='text-sm font-medium'>Interview Type</h2>
        <div className='flex gap-3 flex-wrap mt-2'>
          {InterviewType.map((type, idx) => (
            <div
              key={idx}
              className='
                flex items-center cursor-pointer gap-2 p-1 px-2
                bg-black text-white border border-gray-300 rounded-2xl
                hover:bg-white hover:text-black hover:border-black
                transition-all duration-200
              '
              onClick={() => AddInterviewType(type.title)}
            >
              <type.icon className='h-4 w-4' />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-7 flex justify-end'>
        <Button onClick={() => GoToNext()}>
          Generate Questions <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export default FormContainer
