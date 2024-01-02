import { MouseEventHandler } from "react";

type ButtonProps = {
    label : string
    isDisabled : boolean
    btnType : "button" | "submit"  //* if we give string,we get error
    className : string
    onClick : MouseEventHandler<HTMLButtonElement>
    style : {[id : string] : string}
    overrideClassName : boolean
}

const Button = ({
  label,
  onClick,
  isDisabled,
  btnType,
  className,
  style,
  overrideClassName = false
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
        {label}
    </button>
  );
};


export default Button;
