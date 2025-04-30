"use client";
import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import FormContainer from './_components/FormContainer'

const CreateInterview = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState();
    const onHandleInputChange = (field, value) => {
        console.log('Form Data:', formData);
        setFormData(prev => ({
          ...prev,
          [field]: value,
        }));
      };
      
    return (
        <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
            <div className='flex gap-5 items-center'>
                <ArrowLeft onClick={()=> router.back()} className='cursor-pointer' />
                <h2 className='font-bold text-2xl'>Create New Interview</h2>
            </div>
            <Progress value={step*33.33} className='my-5' />
            <FormContainer onHandleInputChange={onHandleInputChange}/>
        </div>
    )
}

export default CreateInterview