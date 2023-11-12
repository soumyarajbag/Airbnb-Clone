import Categories from "@/components/common/Categories";
import HomeCard from "@/components/common/HomeCard";
import MobileNav from "@/components/common/MobileNav";
import Navbar from "@/components/common/Navbar";
import Toast from "@/components/common/Toast";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function Home({searchParams}:{searchParams?:{[key:string]:string | undefined}}) {
  const supabase = createServerComponentClient({cookies});
  const user = await supabase.auth.getUser()
  const query =  supabase.from("homes").select("id , title , image , country , city  , price , users (metadata->name)").eq("user_id", user.data.user?.id);
  if(searchParams?.country){
    query.ilike("country", `%${searchParams?.country}%`)
  }
  if(searchParams?.category){
    query.contains("categories", [searchParams?.category])
  }
  const {data:home , error} = await query; 
  return (
  <div>
    <Toast />
    <Navbar />
   
    <Categories />
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 px-10">
    {
      home && home.length > 0 && home?.map((item:any) => {
        return(
          <HomeCard home={item} key={item.id} />
        )
      } )
    }
    </div>
    {home && home.length <= 0 && <h1 className="text-brand flex font-bold text-2xl justify-center items-center text-center">No Airbnb Found !</h1>}
  </div>
  )
}
