import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/common/Navbar";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { getImageURL } from "@/lib/utils";
import { Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteHomeButton from "@/components/DeleteHomeButton";
import Toast from "@/components/common/Toast";
import Link from "next/link";

const Dashboard =async () => {
  const supabase = createServerComponentClient({cookies});
  const user = await supabase.auth.getUser();
  const { data:homes, error } = await supabase.from("homes").select("id , image , title , country , city , price , created_at").eq("user_id", user.data.user?.id);
  
  return (
    <>
      <Navbar />
      <Toast />
      <div className="container mt-5 ">
        <Table>
          <TableCaption>Your Added Homes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {homes && 
              homes?.map((home) =>{
                return(
                  <TableRow key={home.id}>
                    <TableCell>{home.country}</TableCell>
                    <TableCell>{home.city}</TableCell>
                    <TableCell>{home.title}</TableCell>
                    <TableCell>
                      <Image src={getImageURL(home.image)} alt="Home_img" width={30} height={30} className="object-contain rounded-full w-12 h-12 shadow-sm" />
                    </TableCell>
                    <TableCell>{home.price}</TableCell>
                    <TableCell>
                    <div className="flex items-center space-x-2">
                   <DeleteHomeButton id={home.id} image={home.image} />
                   <Link href={`/home/${home.id}`}>
                   <Button size={"icon"}className="bg-green-400">      <Eye /></Button>
                   </Link>
                     
                    </div>
                    </TableCell>
                  </TableRow>
                )
              
              })
            }
        
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Dashboard;
