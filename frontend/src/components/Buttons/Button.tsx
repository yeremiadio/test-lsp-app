import { FC, ReactNode, MouseEventHandler } from "react";
import classNames from "../../utils/tailwindClassNames";
import Spinner from "../Spinner";

type ButtonVariants = "solid" | "outlined" | "ghost";
interface ButtonProps {
  children: ReactNode;
  bgColor: "blue-500" | "gray-800" | "red-500";
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  variants?: ButtonVariants;
  type?: "submit" | "reset" | "button";
}

const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    bgColor,
    disabled,
    onClick,
    isLoading,
    variants = "solid",
    className,
    ...rest
  } = props;

  return (
    <button
      className={classNames(
        "px-6 py-[9px] font-medium text-base rounded-lg transition-all delay-75 flex items-center justify-center",
        `disabled:opacity-50 disabled:bg-opacity-100`,
        bgColor &&
          variants === "solid" &&
          `bg-${bgColor} hover:bg-opacity-80 text-white`,
        bgColor &&
          variants === "outlined" &&
          `border-2 border-${bgColor} hover:bg-${bgColor} text-${bgColor}`,
        bgColor &&
          variants === "ghost" &&
          `hover:bg-${bgColor} hover:bg-opacity-10 text-${bgColor}`,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;
