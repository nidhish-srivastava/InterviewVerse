import { MouseEventHandler } from "react";
import { cn } from "../../utils";

type ButtonProps = {
  isDisabled: boolean;
  btnType: "button" | "submit"; //* if we give string,we get error
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  style: { [id: string]: string };
  overrideClassName: boolean;
  children: React.ReactNode;
};

const Button = ({
  onClick,
  isDisabled,
  btnType,
  className,
  style,
  overrideClassName = false,
  children,
}: Partial<ButtonProps>) => {
  const defaultClasses = `
    bg-primary hover:bg-secondary disabled:bg-opacity-70 disabled:cursor-not-allowed
    px-4 py-2 rounded-md text-white cursor-pointer transition-colors duration-300
    ease-in-out whitespace-nowrap select-none outline-none border-none
  `;

  const buttonClasses = overrideClassName
    ? className
    : cn(defaultClasses, className);

  return (
    <button
      type={btnType || "button"}
      className={buttonClasses}
      onClick={onClick}
      disabled={isDisabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
