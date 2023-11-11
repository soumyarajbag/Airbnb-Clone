import Categories from "@/components/common/Categories";
import HomeCard from "@/components/common/HomeCard";
import MobileNav from "@/components/common/MobileNav";
import Navbar from "@/components/common/Navbar";
import Toast from "@/components/common/Toast";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function Home() {
  const supabase = createServerComponentClient({cookies});
  const user = await supabase.auth.getUser();
  const { data:home, error } = await supabase.from("homes").select("id , title , image , country , city  , price , users (metadata->name)").eq("user_id", user.data.user?.id);

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
    
  </div>
  )
}
