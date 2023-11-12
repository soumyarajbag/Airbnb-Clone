import React from 'react'
import BrandLogo from './BrandLogo'
import { Input } from '../ui/input'
import NavMenu from './NavMenu'
import Link from 'next/link'

const SearchSheetNav = ({session}:{session:any}) => { 
  return (
    <div className='flex justify-between items-center px-10 rounded-3xl'>
      <div>
        <BrandLogo />

      </div>
      <Input className='w-full md:w-1/3' placeholder='Search for your Country ' />
      <div className="md:flex items-center space-x-2 hidden">
        <Link href={"/addhome"}><span>Add your Home</span></Link>
     <NavMenu session={session} />
      </div>
    </div>
  )
}

export default SearchSheetNav