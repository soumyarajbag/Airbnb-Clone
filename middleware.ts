import { createMiddlewareClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  
  const supabase = createServerComponentClient({cookies})
  const {data}=await supabase.auth.getUser()
  if(data.user == null){
    return NextResponse.redirect(new URL("/?error=Please Login first to access this route" , request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher:[
    "/addhome","/dashboard"
  ]
}