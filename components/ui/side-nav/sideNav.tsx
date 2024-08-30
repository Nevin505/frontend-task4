import Link from "next/link"

import navStyles from './sideNav.module.css'
import Image from "next/image"

import {navigationLinks}  from '../../../app/lib/Constant';

const SideNav = () => {
  return (
    <nav className={navStyles.sideNavContainer}>
        <div className={navStyles.navLinksContainer}>
          <div>
            <Image src="/icons/hamburger.svg" width={20} height={20} alt="HamBurger"></Image>
          </div>
            {navigationLinks.map(navigationLink=>{
                return <Link href={navigationLink.href} key={navigationLink.navLabel} className={navStyles.navLink}> <Image src={navigationLink.icon} alt={navigationLink.alt} width={20} height={20}/><span>{navigationLink.navLabel}</span></Link>
            }) }
           

        </div>
        <div>
            <button>SignOut</button>
        </div>
    </nav>
  )
}

export default SideNav
