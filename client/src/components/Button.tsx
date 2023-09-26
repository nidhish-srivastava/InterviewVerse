import { MouseEventHandler } from "react";

type ButtonProps = {
    label : string
    isDisabled : boolean
    btnType : "button" | "submit"  //* if we give string,we get error
    className : string
    onClick : MouseEventHandler<HTMLButtonElement>
    style : {[id : string] : string}
}

const Button = ({
  label,
  onClick,
  isDisabled,
  btnType,
  className,
  style
} : Partial<ButtonProps>) => {
  const buttonClasses = `button ${className || ''}`;

  return (
    <button
    type={btnType || "button"}
      className={buttonClasses}
      onClick={onClick}
      disabled = {isDisabled}
      style={style}
    >
        {label}
    </button>
  );
};


export default Button;
