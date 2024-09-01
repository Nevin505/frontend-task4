import SideNav from "@/components/ui/side-nav/sideNav"
import loginLayOutDesiginStyles from './layout.module.css'
import React, { ReactNode } from "react"

type LayoutProps ={
  children: ReactNode; // Define the type for children
}

const layout:React.FC<LayoutProps> = ({children}) => {
  return (
      
      <div className={loginLayOutDesiginStyles.layOutContainer}>
        <SideNav/>
         {children}
    </div>
  )
}

export default layout
