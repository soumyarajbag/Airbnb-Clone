"use client";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { countries } from "@/config/countries";
import { categories } from "@/config/categories";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddHomeType, homeSchema } from "@/validation/homeSchema";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { generateRandomNumber } from "@/lib/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
const AddHomeForm = () => {
  const router = useRouter()
  const [description, setDescription] = useState("");
  const [ image , setImage ] = useState<File | null >(null);
  const [ homeCategories , setHomeCategories ] = useState<Array<string> | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<AddHomeType>({
    resolver: yupResolver(homeSchema),
  });
  useEffect(()=>{
    setValue("categories" , homeCategories)
    setValue("description" , description)
  },[homeCategories,description])
  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const file = e.target.files?.[0];
    if(file){
      setImage(file)
      setValue("image" , file)
    }
  }
  const supabase = createClientComponentClient();
  const onSubmit = async (payload: AddHomeType) => { 
    setLoading(true);
    const user = await supabase.auth.getUser();
    const uniquePath = Date.now() + "-" + generateRandomNumber();
const {data:imageData , error:imageError} = await supabase.storage.from(`${process.env.NEXT_PUBLIC_S3_BUCKET}`).upload(uniquePath , image!)
    if(imageError){
      setLoading(false);
       toast.error(imageError.message, { theme: "colored" });
       return ;
    }
    const {data:homedata , error:homeError} = await supabase.from("homes").insert({
      user_id: user.data.user?.id,
      country: payload.country,
      state: payload.state,
      city: payload.city,
      title: payload.title,
      price: payload.price,
      description: payload.description,
      categories: homeCategories,
      image: imageData?.path

    })
    if(homeError){
      setLoading(false);
      toast.error(homeError.message, { theme: "colored" });
      return ;
   }
   router.push("/");
}
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10">
        <div className="mt-5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter Your Title Here..." {...register("title")} />
          <span className="text-red-500">{errors?.title?.message}</span>
        </div>

        <div className="mt-5">
          <Label htmlFor="country">Countries</Label>

          <select
           
            id="country"
            className="outline-brand h-10 px-3 py-2 rounded-md w-full border"
            {...register("country")}
          >
            <option value="">-- Select Country --</option>
            {countries.map((country, index) => (
              <option key={index} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          <span className="text-red-500">{errors?.country?.message}</span>
        </div>

        <div className="mt-5">
          <Label htmlFor="state">State</Label>
          <Input id="state" placeholder="Enter Your Title Here..." {...register("state")}  />
          <span className="text-red-500">{errors?.state?.message}</span>
        </div>

        <div className="mt-5">
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="Enter Your City Here..." {...register("city")}  />
          <span className="text-red-500">{errors?.city?.message}</span>
        </div>

        <div className="mt-5">
          <Label htmlFor="price">Price</Label>
          <Input id="price" placeholder="Enter Your City Here..." {...register("price")}  />
          <span className="text-red-500">{errors?.price?.message}</span>
        </div>

        <div className="mt-5">
          <Label htmlFor="image">Image</Label>
          <Input id="image" type="file" onChange={handleImageChange}  />
          <span className="text-red-500">{errors?.image?.message}</span>
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="description">Description</Label>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          className="w-full "
        />
          <span className="text-red-500">{errors?.description?.message}</span>
      </div>

      <div className="mt-5">
        <Label htmlFor="categories">Categories</Label>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4  lg:grid-cols-4">
          {categories.map((category, index) => {
            return (
              <div key={index} className="flex space-x-2 items-center">
                <input
                  type="checkbox"
                  value={category.name}
                  id={category.name}
                  checked={(homeCategories as string[]).includes(category.name)}
                  onChange={(e) => { 
                    if(e.target.checked){
                      setHomeCategories([...homeCategories , category.name])
                    }else{
                      setHomeCategories(homeCategories.filter((cat) => cat !== e.target.value))
                    }
                  }}
                />
                <Label htmlFor={category.name} className="text-sm font-medium">
                  {category.name}
                </Label>
              </div>
            );
          })}
        </div>
        <span className="text-red-500">{errors?.categories?.message}</span>
      </div>
      <div className="mt-5">
        <Button className="bg-brand w-full" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default AddHomeForm;
