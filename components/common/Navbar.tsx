import React from "react";
import BrandLogo from "./BrandLogo";
import { Search  } from "lucide-react";
import NavMenu from "./NavMenu";
import MobileNav from "./MobileNav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
const Navbar = async () => {
  const supabase = createServerComponentClient({cookies})
  const { data , error} = await supabase.auth.getSession();
  console.log(data)
  return (
    <div className="flex items-center justify-between px-10 border-b-[1px]">
      <div className="hidden md:block">
        <BrandLogo />
      </div>

      <div className="w-full md:w-auto">
      <div className="hidden border rounded-3xl p-2 md:flex items-center space-x-2">
        <span className="text-sm pl-2">Anywhere </span>
        <span>|</span>
        <span className="text-sm">Any Week </span>
        <span>|</span>
        <span className="text-sm  text-gray-400">Add Guest </span>
        <span className="bg-brand text-white pr-2 p-2 rounded-full">
          <Search height={17} width={17} />
        </span>
      </div>

      <MobileNav />
      </div>
     
      <div className="md:flex items-center space-x-2 hidden">
        <span>Add your Home</span>
     <NavMenu session={data?.session?.user} />
      </div>
    </div>
  );
};

export default Navbar;
