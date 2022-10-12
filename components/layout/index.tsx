import Navbar from './navbar'
import Footer from './footer'
import React from 'react'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={'flex flex-col dark:prose-invert'}>
      <Navbar />
      <main className={'flex-1 px-6 py-10 max-w-[76ch] mx-auto xl:text-lg'}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
