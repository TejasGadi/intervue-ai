import React from 'react';
import react from 'react'

interface QuestionListContainerProps {
    questionList?: {
        question: string
        type: string
    }[];
    onCreateLink: (interview_id: string) => void;
}

const QuestionListContainer: React.FC<QuestionListContainerProps> = ({questionList, onCreateLink}) => {
  return <>
          <h2 className='font-bold text-lg mb-5'>Generated Interview Questions</h2>
                <div className='p-5 border border-gray-300 rounded-xl bg-white'>
                    {questionList?.map((entry, index) => (
                        <div key={index} className='p-3 border border-gray-200 rounded-xl mb-3'>
                            <h2 className='font-medium'>{entry?.question}</h2>
                            <h2 className='text-sm text-primary'>Type: {entry?.type}</h2>

                        </div>
                    ))}
                </div>
  </>
}

export default QuestionListContainer