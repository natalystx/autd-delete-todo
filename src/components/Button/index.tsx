import React from "react";
import { cn } from "../../utils/cn";

type ButtonProps = {
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-6 py-4 text-center text-black border border-neutral-400 shadow bg-white",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
