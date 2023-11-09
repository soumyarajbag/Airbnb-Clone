import { getImageURL } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeCard = ({home}:{home:any}) => {
  return (
    <Link href={`/home/${home.id}`}>
        <div>
            <Image className='w-full h-[300px] rounded-xl object-cover object-center ' src={getImageURL(home.image)} width={100} height={100} alt={home.title} />
                <p className='font-semibold'>{home.city} , {home.country}</p>
                <p>{home.title}</p>
                <p>{home.price}</p>
        </div>
    </Link>
  )
}

export default HomeCard