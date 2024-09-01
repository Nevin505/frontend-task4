"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import Image from "next/image"

import navStyles from './sideNav.module.css'

import {navigationLinks}  from '../../../app/lib/Constant';
import { usePathname, useRouter } from "next/navigation";


const SideNav = () => {

 const currentPath= usePathname()

 const[highlightButton,setHighlightedButton]= useState<string>();

const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);


 useEffect(() => {
  // Highlight the button based on the current route
  const activeLink = navigationLinks.find(link => link.href === currentPath);
  if (activeLink) {
    setHighlightedButton(activeLink.navLabel);
  }
}, [currentPath]); // Update whenever the route changes

// Function to toggle the Side Bar
const toggleSidebar = () => {
  setIsSidebarCollapsed(!isSidebarCollapsed);
};

// Set the highlighted button
const highlightButtonHandler = (navLabel: string) => {
  setHighlightedButton(navLabel); 
};
  return (
    <nav className={`${navStyles.sideNavContainer} ${isSidebarCollapsed && navStyles.toggleDisplay}`}>
      <div className={navStyles.mobileHamBurger}>
      <Image  onClick={toggleSidebar} className={navStyles.expandMore} src={!isSidebarCollapsed ? "/icons/expand-left.svg":"/icons/expand-right.svg"} alt="SignOut Button" width={40} height={40}/>
      </div>
      
        <div className={navStyles.navLinksContainer}>
           <Image  onClick={toggleSidebar} className={navStyles.expandMore} src={!isSidebarCollapsed ? "/icons/expand-left.svg":"/icons/expand-right.svg"} alt="SignOut Button" width={40} height={40}/>
          
          <div>
            {navigationLinks.map((navigationLink)=>{
                return <Link onClick={()=>highlightButtonHandler(navigationLink.navLabel)} href={navigationLink.href} key={navigationLink.navLabel} className={`${navStyles.navLink} ${highlightButton===navigationLink.navLabel?
                  navStyles.active:undefined}`}> <Image src={navigationLink.icon} alt={navigationLink.alt} width={20} height={20} title={navigationLink.navLabel}/>{!isSidebarCollapsed &&<span>{navigationLink.navLabel}</span>}</Link>
            }) }       
          </div>
          </div>

            <button className={navStyles.signoutButton}><Image  src="/icons/signout.svg" alt="SignOut Button" width={20} height={20} title="Log Out"/>{!isSidebarCollapsed && 'log Out'}</button>
    </nav>
  )
}

export default SideNav
