import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, FC } from "react";

const buttonVariants = cva("rounded-md", {
  variants: {
    variant: {
      default: "bg-blue-500 text-white hover:bg-blue-600",
      outline: "border border-2 border-blue-500 hover:bg-blue-500",
      signin : "bg-gray-900 text-white rounded-md w-full flex items-center justify-center my-2 hover:bg-black"
    },
    size: {
      sm: "py-1 px-2 sm:text-lg",
      default: "py-2 px-4 text-lg sm:text-xl",
      lg: "py-3 px-6 text-xl sm:text-2xl",
      xl: "py-4 px-8 text-2xl sm:text-3xl",
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  size,
  isLoading,
  ...props
}) => {
  return (
    <button className={buttonVariants({variant, size})} disabled={isLoading} {...props}>
      {isLoading ? <Loader2 className="animate-spin mr-4"/> : null}
      {children}
    </button>
  );
};

export default Button;
