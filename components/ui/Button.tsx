import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "white";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  href?: undefined;
}

interface LinkButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  href: string;
  target?: string;
  rel?: string;
}

type Props = BaseButtonProps | LinkButtonProps;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-red-700 hover:bg-red-800 text-white shadow-lg hover:shadow-red-700/30 hover:shadow-xl",
  secondary:
    "bg-[#1A1A2E] hover:bg-[#16213E] text-white shadow-lg",
  outline:
    "border-2 border-white text-white hover:bg-white hover:text-red-700",
  ghost:
    "text-red-700 hover:bg-red-50",
  white:
    "bg-white text-red-700 hover:bg-red-50 shadow-lg",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button(props: Props) {
  const { variant = "primary", size = "md", className, children } = props;

  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 cursor-pointer",
    variants[variant],
    sizes[size],
    className
  );

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel } = props as LinkButtonProps;
    return (
      <Link href={href} className={baseClasses} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _v, size: _s, className: _c, ...buttonRest } =
    props as BaseButtonProps & { href?: undefined };

  return (
    <button className={baseClasses} {...buttonRest}>
      {children}
    </button>
  );
}
