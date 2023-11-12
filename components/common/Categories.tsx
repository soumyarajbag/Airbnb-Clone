"use client"
import { categories } from "@/config/categories";
import Image from "next/image";
import { useRouter , useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [cat , setCat] = useState("")
  useEffect(()=>{
    if(params?.get("category")){
      setCat(params?.get("category")!)
    }
  })
    const router = useRouter()
    const params = useSearchParams()
  const handleClick = (name:string)=>{
    const fullURL = new URL(window.location.href)
    fullURL.searchParams.set("category" , name)
    router.replace(`/${fullURL.search}`)
  }
  return (
    <div className="flex justify-center items-center space-x-8 whitespace-nowrap px-10 my-3 overflow-x-auto pb-4">
      {categories.map((category , index) => {
        return (
          <div className="flex items-center flex-col cursor-pointer" key={index} onClick={()=>{
            handleClick(category.name)
          }}>
            <Image
              src={category.icon}
              alt={category.name}
              width={25}
              height={25}
              className="rounded-full"
            />
            <span className={`${category.name===cat?"inline-block border-b-4 border-brand":""}`}>{category.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
