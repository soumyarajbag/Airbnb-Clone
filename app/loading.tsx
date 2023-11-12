import Image from 'next/image'
import React from 'react'

const loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
        <Image src={"/images/logo.png"} width={300} height={300} alt='logo' />
        <h1 className='mt-5'>Loading ....</h1>
    </div>
  )
}

export default loading