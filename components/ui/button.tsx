import buttonStyles from './button.module.css'
const Button = ({children,onClick,className}:any) => {
  return (
       <button onClick={onClick} type="button" className={`${buttonStyles.mediumPadding}  ${className}`}>{children}</button>
  )
}

export default Button
