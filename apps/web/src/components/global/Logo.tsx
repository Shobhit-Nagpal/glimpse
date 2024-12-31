interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <img
      src="/glimpse-logo.png"
      alt="Logo"
      className={`${className} w-10 h-10`}
    />
  );
}
