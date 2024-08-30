import SideNav from "@/components/ui/side-nav/sideNav"
import loginLayOutDesiginStyles from './layout.module.css'

const layout = ({children}) => {
  return (
      
      <div className={loginLayOutDesiginStyles.layOutContainer}>
        <SideNav/>
         {children}
    </div>
  )
}

export default layout
