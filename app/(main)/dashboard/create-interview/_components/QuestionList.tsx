import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Loader2Icon} from 'lucide-react'
import { Button } from '@/components/ui/button'
import QuestionListContainer from './QuestionListContainer'
import { supabase } from '@/services/supbaseClient'
import { v4 as uuidv4 } from 'uuid';

interface QuestionListProps {
    formData?: {
        jobPosition: string
        jobDescription: string
        interviewDuration: string
        type: string[]
    }
}

  const QuestionList: React.FC<QuestionListProps> = ({formData}) => {
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

    const onFinish = async () =>{
        setSaveLoading(true)
        const interview_id = uuidv4()
        try{
            const { data, error } = await supabase
            .from('interviews')
            .insert([
                { 
                    ...formData, 
                    questionList: questionList,
                    interview_id: interview_id
                 },
            ])
            .select()
            console.log(data)
        } catch(e){
            console.log("Query Error: ", e)
        }finally{
            setSaveLoading(false)
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
                <QuestionListContainer questionList={questionList} />
            </div>
        }

        <div className='flex justify-end mt-10'>
            <Button onClick={() => onFinish()} disabled={saveLoading}>  
                {saveLoading && <Loader2Icon className='animate-spin'/>}
                Finish
            </Button>
        </div>
    </div>
  )
}

export default QuestionList