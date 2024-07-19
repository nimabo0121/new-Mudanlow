// components/layout/MudanlowLayout.js

import React from 'react'
import Head from 'next/head'
import Navbar from './navbar'
import NavbarLogin from './navbar-login'
import Footer from './footer'
import { useAuth } from '@/hooks/use-auth'
import { useLoader } from '@/hooks/use-loader'
import NavbarMotion from './navbar-motion'

export default function MudanlowLayout({ title = 'Mudanlow', children }) {
  const { auth } = useAuth()
  const { loader } = useLoader()

  const isHomePage =
    typeof window !== 'undefined' && window.location.pathname === '/'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      {isHomePage ? null : auth.isAuth ? <NavbarLogin /> : <Navbar />}
      <main className="flex-shrink-0">
        <div
          className=""
          style={{
            position: 'relative',
            margin: '0px',
            border: '0px',
            width: '100%',
            height: '100%',
          }}
        >
          <NavbarMotion />
          <div className="">{children}</div>
        </div>
        {loader()}
      </main>
      <Footer />
    </>
  )
}
