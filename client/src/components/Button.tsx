import { MouseEventHandler } from "react";

type ButtonProps = {
    isDisabled : boolean
    btnType : "button" | "submit"  //* if we give string,we get error
    className : string
    onClick : MouseEventHandler<HTMLButtonElement>
    style : {[id : string] : string}
    overrideClassName : boolean
    children : React.ReactNode
}

const Button = ({
  onClick,
  isDisabled,
  btnType,
  className,
  style,
  overrideClassName = false,
  children
} : Partial<ButtonProps>) => {
  const buttonClasses = `
  bg-primary hover:bg-secondary disabled:bg-gray-400 disabled:cursor-not-allowed px-4 py-2 rounded-md text-white  cursor-pointer  transition-colors duration-300 ease-in-out whitespace-nowrap select-none sm:text-lg sm:px-6 sm:py-3 
  ${className || ''}`;

  return (
    <button
    type={btnType || "button"}
      className={overrideClassName ? "" : buttonClasses}
      onClick={onClick}
      disabled = {isDisabled}
      style={style}
    >
      {children}
    </button>
  );
};


export default Button;
