"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Search } from "lucide-react"
import MobileNav from "./MobileNav"
import SearchSheetNav from "./SearchSheetNav"
import DatePicker from "./DatePicker"
import { Button } from "../ui/button"
import { useState } from "react"
  

const SearchSheet = ({session}:{session:any}) => {
  const [open , setOpen] = useState(false)

  return (
    <div>
        <Sheet open={open}>
    <SheetTrigger asChild>
    <div className="w-full md:w-auto cursor-pointer" onClick={()=>{setOpen(true)}}>
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
    </SheetTrigger>
    <SheetContent side={'top'} showCloseIcon={false}>
      <SheetHeader>
        <SheetTitle><SearchSheetNav session={session} /></SheetTitle>
        <SheetDescription >
          <div className="flex flex-col justify-center items-center">
          <DatePicker />

          <div className="flex justify-center space-x-4 items-center my-5">
          <Button className="bg-brand">Search</Button>
          <Button variant={"outline"} onClick={()=>{setOpen(false)}}>Close</Button>
          </div>
          </div>
         
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
  </div>
  )
}

export default SearchSheet