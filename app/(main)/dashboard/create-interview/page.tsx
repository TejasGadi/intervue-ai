"use client";
import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import FormContainer from './_components/FormContainer'
import QuestionList from './_components/QuestionList';
import { toast }  from "sonner"
import InterviewLink from './_components/InterviewLink';

interface FormData {
    jobPosition: string;
    jobDescription: string;
    interviewDuration: string;
    type: string[];
  }

const CreateInterview = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        jobPosition: "",
        jobDescription: "",
        interviewDuration: "",
        type: []
      });
    const [interview_id, setInterview_id] = useState<string>("")
    
    // (field: string, value: any) => void
    const onHandleInputChange = (field: string, value: any) => {
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

    const onCreateLink = (interview_id: string) =>{
        setInterview_id(interview_id)
        setStep(step+1)
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
                step === 2 ? <QuestionList  formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/> :
                step === 3 ? <InterviewLink interview_id={interview_id} formData={formData} /> : null
            }
        </div>
    )
}

export default CreateInterview