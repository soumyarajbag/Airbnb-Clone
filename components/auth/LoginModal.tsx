"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginType, loginSchema } from "@/validation/authSchema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import SocialButton from "./SocialButton";
const LoginModal = () => {
  const router = useRouter();
  const [open , setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (payload: LoginType) => {
    setLoading(true);
    const {data , error} = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    })
    setLoading(false);
    if(error){
      return toast.error(error.message, { theme: "colored" });
    }
    else if(data.user){
      setOpen(false);
      router.refresh();
      toast.success("Login Successfull", { theme: "colored" });
      
    }
  }
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer" onClick={()=>{setOpen(true)}}>
          Login
        </li>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle asChild>
            <div className="flex justify-between item-center">
              Login
              <X className="hover:cursor-pointer" onClick={()=>{setOpen(false)}} />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              {/* <ToastContainer /> */}
              <form action="" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-lg font-bold">Welcome to AirBnb</h1>
              <div className="mt-5">
                <Label htmlFor="email">Email</Label>
                <Input placeholder="Enter Your Email" id="email" type="email" {...register("email")} />
                <span className="text-red-400">{errors.email?.message}</span>
              </div>
              <div className="mt-5">
                <Label htmlFor="password">Password</Label>
                <Input placeholder="Enter Your Password" id="password" type="password" {...register("password")} />
                <span className="text-red-400">{errors.password?.message}</span>
              </div>
              <div className="mt-5">
                <Button className="bg-brand w-full " disabled={loading}>{loading ? "Processing":"Continue"}</Button>
              </div>
              <h1 className="text-center my-2 font-bold text-xl">-- OR --</h1>

             
            </form>
            <SocialButton />
            </div>
           
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginModal;
