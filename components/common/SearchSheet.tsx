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
  

const SearchSheet = () => {
  return (
    <div>
        <Sheet>
    <SheetTrigger asChild>
    <div className="w-full md:w-auto cursor-pointer">
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
    <SheetContent side={'top'}>
      <SheetHeader>
        <SheetTitle>Are you sure absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
  </div>
  )
}

export default SearchSheet