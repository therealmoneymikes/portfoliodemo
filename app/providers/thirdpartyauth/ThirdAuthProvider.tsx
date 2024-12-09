"use client"
import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'inspector'

const ThirdAuthProvider = ({children}: {children:ReactNode}) => {

  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default ThirdAuthProvider