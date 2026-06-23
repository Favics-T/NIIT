import React from 'react'

interface HomePageLayoutProps{
    children:React.ReactNode
}

export default function HomePageLayout({children}:HomePageLayoutProps) {
  return (
    <div>
      {children}
    </div>
  )
}
