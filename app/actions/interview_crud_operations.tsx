'use server'

import { prisma } from '@/lib/prisma';

interface InterviewInput {
  interview_id: string
  jobPosition: string
  jobDescription: string
  interviewDuration: string
  type: string[]
  question_list: any[]
}

export async function saveInterview(data: InterviewInput) {
  // Check if necessary data is present
  if (!data.interview_id || !data.jobPosition || !data.jobDescription || !data.interviewDuration || !data.type || !data.question_list) {
    throw new Error('Missing required fields')
  }

  try {
    // Save the interview data to the database
    const interview = await prisma.interview.create({
      data: {
        interview_id: data.interview_id,
        jobPosition: data.jobPosition,
        jobDescription: data.jobDescription,
        interviewDuration: data.interviewDuration,
        type: data.type,
        question_list: data.question_list,
      },
    })

    // Optionally, log the saved interview for debugging purposes
    console.log('Interview saved:', interview)

    return interview
  } catch (error) {
    // More detailed error handling
    console.error('❌ Failed to save interview:', error)
    if (error instanceof Error) {
      throw new Error(`Database error: ${error.message}`)
    }
    throw new Error('Unknown error occurred while saving the interview')
  }
}


// Fetch Interview Entry by interview_id
export async function getSelectedInterviewDetails(interview_id: string) {
  if (!interview_id) {
    throw new Error('Missing interview_id')
  }

  try {
    const interview = await prisma.interview.findUnique({
      where: {
        interview_id,
      },
      select:{
        jobPosition: true,
        jobDescription: true,
        interviewDuration: true, 
        type: true
      }
    })

    if (!interview) {
      throw new Error('Interview not found')
    }

    console.log(`interview details: ${interview}`)

    return interview
  } catch (error) {
    console.error('❌ Failed to fetch interview details:', error)
    // throw new Error('Unknown error occurred while fetching interview details')
    return null
  }
}


// Fetch Interview Entry by interview_id
export async function getInterviewDetails(interview_id: string) {
  if (!interview_id) {
    throw new Error('Missing interview_id')
  }

  try {
    const interview = await prisma.interview.findUnique({
      where: {
        interview_id,
      },
    })

    if (!interview) {
      throw new Error('Interview not found')
    }

    console.log(`interview details: ${interview}`)

    return interview
  } catch (error) {
    console.error('❌ Failed to fetch interview details:', error)
    // throw new Error('Unknown error occurred while fetching interview details')
    return null
  }
}

