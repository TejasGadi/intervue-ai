"use client";
import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import FormContainer from './_components/FormContainer'
import QuestionList from './_components/QuestionList';
import { toast }  from "sonner"

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
    
    const onGoToNext = () =>{
        console.log('Form Data:', formData);
        if(!formData?.jobPosition || !formData?.type || !formData?.jobDescription || !formData?.interviewDuration){
            toast('Please fill all the fields')
            return;
        }
        setStep(step+1);
    }
    return (
        <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
            <div className='flex gap-5 items-center'>
                <ArrowLeft onClick={()=> router.back()} className='cursor-pointer' />
                <h2 className='font-bold text-2xl'>Create New Interview</h2>
            </div>
            <Progress value={step*33.33} className='my-5' />
            {
                step === 1 ? <FormContainer onHandleInputChange={onHandleInputChange} GoToNext={() => onGoToNext()} /> : 
                step === 2 ? <QuestionList  formData={formData} /> :
                null 
            }
        </div>
    )
}

export default CreateInterview