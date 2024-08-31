import { ReactNode } from 'react';
import cardStyles from './card.module.css'


interface CardProps {
    children: ReactNode; // Define the children prop type
}

const Card:React.FC<CardProps> = ({children}) => {
  return (
    <div className={cardStyles.Container}>
    <div className={cardStyles.InputVerificationContainer}>
        {children}
    </div>
  </div>
  )
}

export default Card
