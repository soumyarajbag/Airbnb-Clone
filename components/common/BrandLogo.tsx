import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
Image
const BrandLogo = () => {
  return (
    <Link href={"/"}>
        <Image src="/images/logo.png" alt="Logo" width={120} height={120} className='hidden lg:block' />
        <Image src="/images/logo-sm.png" alt="Logo" width={90} height={90} className='lg:hidden' />
    </Link>
  )
}

export default BrandLogo