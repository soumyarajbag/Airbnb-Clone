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
import { useEffect, useState } from "react"
import { addDays , format , differenceInDays, parse} from "date-fns"
import { useRouter , useSearchParams } from "next/navigation"

const SearchSheet = ({session}:{session:any}) => {
  const router = useRouter()
  const params = useSearchParams()
  const [searchedParams , setSearchedParams] = useState({
    country : "",
    days : ""
  })
  const [open , setOpen] = useState<boolean>(false)
  const [search , setSearch] = useState<string>("")
  const [dateState , setDateState] = useState([
    {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key:"selection"
    }
])
const handleDateChange=(date:any)=>{
  setDateState([date.selection])
}
useEffect(()=>{
  const difference = differenceInDays(parse(params?.get("endDate")! , "dd-MM-yyyy" , new Date()) , parse(params?.get("startDate")! , "dd-MM-yyyy" , new Date()))
  if(difference){
    setSearchedParams({
      ...searchedParams , country:params.get("country") ? params.get("country")! : "",
      days:`${difference} days`
    })
  }
},[params])
const handleSubmit = ()=>{
  const startDate = format(dateState[0].startDate , "dd-MM-yyyy")
  const endDate = format(dateState[0].endDate , "dd-MM-yyyy")
  router.replace(`/?country=${search}&startDate=${startDate}&endDate=${endDate}`)
  setOpen(false)
}
  return (
    <div>
        <Sheet open={open}>
    <SheetTrigger asChild>
    <div className="w-full md:w-auto cursor-pointer" onClick={()=>{setOpen(true)}}>
      <div className="hidden border rounded-3xl p-2 md:flex items-center space-x-2">
        <span className="text-sm pl-2">{searchedParams.country != ""?searchedParams.country : "Anywhere"} </span>
        <span>|</span>
        <span className="text-sm">{searchedParams.days != ""?searchedParams.days : "Any Week"} </span>
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
        <SheetTitle><SearchSheetNav session={session} searchInputCallback={setSearch}  /></SheetTitle>
        <SheetDescription >
          <div className="flex flex-col justify-center items-center">
          <DatePicker dateChangeCallback={handleDateChange} state={dateState} />

          <div className="flex justify-center space-x-4 items-center my-5">
          <Button className="bg-brand" onClick={handleSubmit}>Search</Button>
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