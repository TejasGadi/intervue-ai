import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Loader2Icon} from 'lucide-react'
import { Button } from '@/components/ui/button'
import QuestionListContainer from './QuestionListContainer'
import { supabase } from '@/services/supbaseClient'
import { v4 as uuidv4 } from 'uuid';
import { saveInterview } from '@/app/actions/interview_crud_operations'

interface QuestionListContainerProps {
    formData: {
      jobPosition: string;
      jobDescription: string;
      interviewDuration: string;
      type: string[];
    };
    onCreateLink: (interview_id: string) => void;
  }

interface InterviewInput {
    interview_id: string
    jobPosition: string
    jobDescription: string
    interviewDuration: string
    type: string[]
    question_list: any[]
  }
  

  const QuestionList: React.FC<QuestionListContainerProps> = ({formData, onCreateLink}) => {
    const [loading, setLoading] = useState(false)
    const [questionList, setQuestionList] = useState([])
    const [saveLoading, setSaveLoading] = useState(false)

    useEffect(() =>{
        if (!formData)return

        const fetchQuestions = async () => {
            setLoading(true)
            try {
                const res = await axios.post('/api/ai-model', {...formData})
                // setQuestions(res.data.content)    // <-- store questions in state
                if (res.status !== 200) {
                    // handle the error payload in res.data.error
                    console.log(`Error: ${res}`)
                    // setError(res.data.error || "Unknown error");
                } else {
                    console.log(res)
                    const raw_content = res.data.content;
                    const filtered_content = JSON.parse(
                        raw_content.replace(/^["']*```json\s*/, '')
                        .replace(/\s*```["']*$/, '')
                        .replace(/\\n/g, '\n')
                    )?.interviewQuestions;

                    setQuestionList(filtered_content)
                    // console.log(filtered_content)
                  }
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }

        fetchQuestions()

    }, [formData])
    
    const onFinish = async () => {
    setSaveLoading(true)
    const interview_id = uuidv4()

    // Prepare the data
    const interviewData: InterviewInput = {
        interview_id,
        jobPosition: formData?.jobPosition ?? '',
        jobDescription: formData?.jobDescription ?? '',
        interviewDuration: formData?.interviewDuration ?? '',
        type: formData?.type ?? [],
        question_list: questionList,
    }

    try {
        // Call the server action to save the interview data
        await saveInterview(interviewData)
        console.log('Interview saved successfully')
    } catch (error) {
        console.error('Failed to save interview:', error)
    } finally {
        setSaveLoading(false)
        onCreateLink(interview_id)
    }
    }

  return (
    <div>
        {
        loading && 
        <div className='p-5 bg-gray-50 rounded-xl border border-black-100 flex gap-5'>
            <Loader2Icon className='animate-spin' />
            <div>
                <h2 className='font-medium'>Generating Interview Question</h2>
                <p className='text-primary'>Our AI is crafting personalized questions based on your job position</p>
            </div>
        </div>
        }

        {
            questionList?.length > 0 &&
            <div>
                <QuestionListContainer questionList={questionList} onCreateLink={onCreateLink} />
            </div>
        }

        <div className='flex justify-end mt-10'>
            <Button onClick={() => onFinish()} disabled={saveLoading} className='cursor-pointer' >  
                {saveLoading && <Loader2Icon className='animate-spin'/>}
                Create Interview Link and Finish
            </Button>
        </div>
    </div>
  )
}

export default QuestionList