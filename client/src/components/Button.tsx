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
  const buttonClasses = `button  ${className || ''}`;

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
