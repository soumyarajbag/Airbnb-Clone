import React from "react";
import BrandLogo from "./BrandLogo";
import { Search  } from "lucide-react";
import NavMenu from "./NavMenu";
import MobileNav from "./MobileNav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import SearchSheet from "./SearchSheet";
const Navbar = async () => {
  const supabase = createServerComponentClient({cookies})
  const { data , error} = await supabase.auth.getSession();
  console.log(data)
  return (
    <div className="flex items-center justify-between px-10 border-b-[1px]">
      <div className="hidden md:block">
        <BrandLogo />
      </div>

      <SearchSheet />
     
      <div className="md:flex items-center space-x-2 hidden">
        <Link href={"/addhome"}><span>Add your Home</span></Link>
     <NavMenu session={data?.session?.user} />
      </div>
    </div>
  );
};

export default Navbar;
