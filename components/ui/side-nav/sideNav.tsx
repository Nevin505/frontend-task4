"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import Image from "next/image"

import navStyles from './sideNav.module.css'

import {navigationLinks}  from '../../../app/lib/Constant';
import { usePathname, useRouter } from "next/navigation";


const SideNav = () => {

 const currentPath= usePathname();

const useRoute= useRouter();

 const[highlightButton,setHighlightedButton]= useState<string>();

const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);



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
  setIsSidebarCollapsed(true)
};

const handleNavigation=()=>{
  sessionStorage.clear()
  useRoute.push('/')
}
  return (
    <nav   className={navStyles.mainNavContainer} >
      <div className={navStyles.mobileHamBurger} title="Open Navigagation Bar">
      <Image  onClick={toggleSidebar} className={navStyles.mobileHamBurger} src={!isSidebarCollapsed ? "/icons/expand-right.svg":"/icons/expand-left.svg"} alt="SignOut Button" width={40} height={40}/>
      </div>
      
         <div className={`${navStyles.sideNavContainer} ${isSidebarCollapsed && navStyles.toggleDisplay}`}>

         <div className={navStyles.navLinksContainer}>
           <Image  onClick={toggleSidebar} className={navStyles.expandMore} src={!isSidebarCollapsed ? "/icons/expand-left.svg":"/icons/expand-right.svg"} alt="SignOut Button" width={40} height={40}/>
          
          <div className={`${navStyles.navLinksItemsContainer} ${isSidebarCollapsed?navStyles.display0:navStyles.display1}`}>
            {navigationLinks.map((navigationLink)=>{
                return <Link onClick={()=>highlightButtonHandler(navigationLink.navLabel)} href={navigationLink.href} key={navigationLink.navLabel} className={`${navStyles.navLink} ${highlightButton===navigationLink.navLabel?
                  navStyles.active:undefined}`}> <Image src={navigationLink.icon} alt={navigationLink.alt} width={20} height={20} title={navigationLink.navLabel}/>{!isSidebarCollapsed &&<span>{navigationLink.navLabel}</span>}</Link>
            }) }       
          </div>
          </div>

            <button className={`${navStyles.signoutButton} ${isSidebarCollapsed?navStyles.display0:navStyles.display1}`}onClick={handleNavigation}><Image  src="/icons/signout.svg" alt="SignOut Button" width={20} height={20} title="Log Out"/>{!isSidebarCollapsed && 'log Out'}</button>

         </div>
    </nav>
  )
}

export default SideNav
