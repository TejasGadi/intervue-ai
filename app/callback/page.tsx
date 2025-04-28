'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/services/supbaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      // This will parse the tokens from URL and save session
      const { error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error during auth redirect:', error.message);
      } else {
        // After successful login, redirect to home page 
        router.replace('/auth');
      }
    };

    handleAuthRedirect();
  }, [router]);

  return <p className="text-center mt-10">Signing you in...</p>;
}