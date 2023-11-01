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

const LoginModal = () => {
  const [open , setOpen] = useState<boolean>(false);
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
          <AlertDialogDescription>
            <form action="">
              <h1 className="text-lg font-bold">Welcome to AirBnb</h1>
              <div className="mt-5">
                <Label htmlFor="email">Email</Label>
                <Input placeholder="Enter Your Email" id="email" />
                <span className="text-red-400"></span>
              </div>
              <div className="mt-5">
                <Label htmlFor="password">Password</Label>
                <Input placeholder="Enter Your Password" id="password" />
                <span className="text-red-400"></span>
              </div>
              <div className="mt-5">
                <Button className="bg-brand w-full ">Continue</Button>
              </div>
              <h1 className="text-center my-2 font-bold text-xl">-- OR --</h1>

              <Button variant={"outline"} className="w-full">
                <Image
                  src={"/images/google.png"}
                  className="mr-5"
                  width={25}
                  alt="Google"
                  height={25}
                />
                Continue with Google
              </Button>
              <Button variant={"outline"} className="w-full mt-5">
                <Image
                  src={"/images/github.png"}
                  className="mr-5"
                  width={25}
                  alt="Google"
                  height={25}
                />
                Continue with Github
              </Button>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginModal;
