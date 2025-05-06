"use client"

import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useContext, useEffect, useMemo } from 'react'
import Vapi from "@vapi-ai/web";
import axios from 'axios'
import { getAssistantOptions } from '@/services/Constants'
import AlterConfirmation from './_components/AlertConfirmation'
import { toast } from "sonner"
import TimerComponent from './_components/TimeComponent'
import { useRouter } from 'next/navigation'

const StartInterview = () => {
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext)
    const vapi = useMemo(
        () => new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY),
        []
      );
    const [activeUser, setActiveUser] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const [conversation, setConversation] = useState<any>()
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const generateFeedback = async() => {
        try {
            const payload = {
                conversation: conversation,
                userName: interviewInfo.userName,
                userEmail: interviewInfo.userEmail,
                interview_id: interviewInfo.interview_id,
                recommended: false,
            }
            const res = await axios.post('/api/ai-feedback', payload)

            // setQuestions(res.data.content)    // <-- store questions in state
            if (res.status === 200) {
                console.log('Feedback saved:', res.data.saved)
                // setError(res.data.error || "Unknown error");
            } else {
                // handle the error payload in res.data.error
                console.log(`Error: ${res.data.error}`)                
            }
            router.replace('/interview/' + interviewInfo.interview_id + '/completed')
            setLoading(false)
        } catch (e) {
            console.error('Request Failed:', e)
        }
    }

    const stopInterview = async () => {
        if (loading || !isRunning) return;            // guard against double‐click
        setLoading(true);                 // show spinner
        setIsRunning(false);              // stop the timer animation
        toast('Call ended. Saving feedback…');
        vapi.stop();                      // forcibly tear down the call
    
        try {
          await generateFeedback();       // push your conversation + feedback
          router.replace(`/interview/${interviewInfo.interview_id}/completed`);
        } catch (e) {
          console.error('Could not save feedback:', e);
          toast.error('Something went wrong saving feedback.');
        } finally {
          setLoading(false);
        }
    }
    
    // start call when interviewInfo is available
    useEffect(() => {
        if (!interviewInfo) return;
        const userName = interviewInfo?.userName ;
        const jobPosition =  interviewInfo?.jobPosition;
        const questionList = interviewInfo.interviewData?.map(item => item.question) || [];

        const assistantOptions = getAssistantOptions({ userName, jobPosition, questionList });
        vapi.start(assistantOptions)
        .then(call => console.log('Call object:', call))
        .catch(err => {
            console.error('Failed to start Vapi:', err);
            toast.error('Unable to start call');
          });

    }, [interviewInfo, vapi])


    // subscribe to vapi events and cleanup
    useEffect(() =>{
        const onCallStart = () =>{
            toast('Call started...')
            setIsRunning(true)
        }
        const onSpeechStart = () => setActiveUser(true)
        const onSpeechEnd = () => setActiveUser(false)
        const onCallEnd = () => {
            toast('Call ended')
            setIsRunning(false)
            generateFeedback()
        }
        const onMessage = (msg: any) => {
            if (msg?.conversation){
                console.log('Conversation string', msg.conversation);
                setConversation(msg.conversation)
            }
        }
        const onError = (payload: any) =>{
            console.error("vapi error:", payload)
            if (payload.error?.type === 'ejected') {
                toast('The meeting has been ended.')
                generateFeedback()
                setIsRunning(false)
            }else{
                toast(`Error: ${payload.errorMsg}`);
            }
        };


        vapi.on('call-start', onCallStart);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
        };
    }, [vapi]);
  
  return (
    <div className='p-20 lg:px-48 xl:px-56'>
        <h2 className="font-bold text-xl flex justify-between">AI Interview Session
            <span className="flex gap-2 items-center">
                <Timer/>
                <TimerComponent isRunning={isRunning} />
            </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
            <div className="bg-white h-[400px] rounded-lg border flex flex-col items-center justify-center">
                <div className='relative w-[60px] h-[60px]'>
                    {activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />}    
                    <Image src={'/ai-avatar.jpeg'} alt='AI Avatar' width={100} height={100} 
                    className='w-[60px] h-[60px] rounded-full bg-gray-200' />
                </div>

                    <h2 className="mt-2">
                        AI Interviewer
                    </h2>
            </div>
            <div className="bg-white h-[400px] rounded-lg border flex flex-col items-center justify-center">
                <div className='relative'>
                    {!activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />}    
                    <h2 className="text-2xl bg-primary text-white p-3 px-5 rounded-full">
                        {interviewInfo?.userName[0]}
                    </h2>
                </div>
                <h2 className="mt-2">
                    {interviewInfo?.userName}
                </h2>
            </div>
        </div>

        <div className="flex items-center gap-5 justify-center mt-7">
            <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer hover:scale-110'/>
            {/* <AlterConfirmation stopInterview={() => stopInterview()}> */}
                {!loading ? <Phone className='h-12 w-12 p-3 rounded-full text-white bg-red-500 cursor-pointer hover:scale-110'
                onClick={() => stopInterview()}
                /> : <Loader2Icon className='animate-spin' />}
            {/* </AlterConfirmation> */}
                
        </div>

        <h2 className="text-sm text-gray-400 text-center mt-5">Interview is in progress...</h2>
        
    </div>
  )
}

export default StartInterview
