import { Size } from "../../types";

interface ButtonProps {
  primary?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  size?: Size;
  className?: string;
}

export const Button = ({
  primary = false,
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const buttonClass = primary
    ? "bg-primary text-white"
    : "bg-grey-400 border border-300 text-white";

  const sizeClass =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "lg"
        ? "px-4 py-2 text-lg"
        : "px-3 py-2 text-md";
  return (
    <button
      type="button"
      {...props}
      className={`${buttonClass} ${sizeClass} ${className} rounded-md`}
    >
      {children}
    </button>
  );
};
