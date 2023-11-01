"use client"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation"; 
import { useEffect } from "react";
const Toast = () => {
    const params = useSearchParams();
    useEffect(() => {
        if(params?.get('success') && params?.get('success') != ""){
            toast.success(params?.get("success"), { theme: "colored" });
        }
        else if(params?.get('error') && params?.get('error') != ""){
            toast.error(params?.get("success"), { theme: "colored" });
        }
    })
  return (
    <div>
        <ToastContainer />
    </div>
  )
}

export default Toast