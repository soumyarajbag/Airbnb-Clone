"use client"
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SocialButton = () => {
    
    const supabase = createClientComponentClient()
    const githubLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
              redirectTo: `${location.origin}/auth/callback`
            }
          })

          if (error) {
           toast.error(error.message, { theme: "colored" });
          }
    }

    const googleLogin = async()=>{
        const {  error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${location.origin}/auth/callback`
            }
          })

          if (error) {
           toast.error(error.message, { theme: "colored" });
          }
    }
  return (
    <div>
      
         <Button onClick={googleLogin} variant={"outline"} className="w-full">
                <Image
                  src={"/images/google.png"}
                  className="mr-5"
                  width={25}
                  alt="Google"
                  height={25}
                />
                Continue with Google
              </Button>
              <Button onClick={githubLogin} variant={"outline"} className="w-full mt-5">
                <Image
                  src={"/images/github.png"}
                  className="mr-5"
                  width={25}
                  alt="Google"
                  height={25}
                />
                Continue with Github
              </Button>
    </div>
  )
}

export default SocialButton