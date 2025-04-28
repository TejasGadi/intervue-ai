'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supbaseClient';

export default function Login(): React.JSX.Element {
  const signInWithGoogle = async (): Promise<void> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/',
      }
    })
    if (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center border rounded-2xl p-8">
        <Image
          src="/file.svg"
          alt="Illustration of login process"
          width={180}
          height={100}
        />  
        <div className="flex flex-col items-center mt-6">
          <h2 className="mt-5 text-2xl font-bold text-center">
            Welcome to INTERVUE-AI
          </h2>
          <p className="mt-2 text-gray-500">Sign in with Google</p>

          <Button
            className="mt-7 w-full cursor-pointer"
            onClick={signInWithGoogle}
            aria-label="Login with Google"
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}