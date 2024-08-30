'use cilent'
import { ReactNode } from 'react'

import Desigin from '@/components/decorations/Desigin'

import layOut1Style from './layout.module.css'

const Layout:React.FC<{ children: ReactNode }> = ({children}) => {
  return (
    <div className={layOut1Style.layoutDivContainer}>
       <div className={layOut1Style.infoText}>
              <h1> Regsitration Form</h1>
            <Desigin/> 
        </div>  
              {children}

    </div>
  )
}

export default Layout
