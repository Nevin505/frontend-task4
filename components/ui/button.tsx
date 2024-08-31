import buttonStyles from './button.module.css'
const Button = ({children,onClick,className,isDisabled}:any) => {
  return (
       <button onClick={onClick} type="button"  disabled={isDisabled} className={`${buttonStyles.mediumPadding}  ${className}`}>{children}</button>
  )
}

export default Button
