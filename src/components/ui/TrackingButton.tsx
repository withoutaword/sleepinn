"use client";

import { type ComponentProps, type ReactNode } from "react";

type ButtonVariant = "solid" | "outline";
type ButtonColor = "orange" | "sky";

interface TrackingButtonProps extends ComponentProps<"a"> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  icon?: ReactNode;
  buttonType: "booking" | "phone";
  children: ReactNode;
}

const styles: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    orange: "bg-orange-500 hover:bg-orange-600 text-white",
    sky: "bg-sky-500 hover:bg-sky-600 text-white",
  },
  outline: {
    orange: "border-2 border-orange-500 text-orange-500 hover:bg-orange-50",
    sky: "border-2 border-sky-500 text-sky-500 hover:bg-sky-50",
  },
};

export default function TrackingButton({
  variant = "solid",
  color = "orange",
  icon,
  buttonType,
  children,
  className = "",
  onClick,
  ...props
}: TrackingButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    navigator.sendBeacon(
      "/api/track-click",
      JSON.stringify({ buttonType })
    );
    if (onClick) onClick(e);
  }

  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold text-sm transition-colors min-h-[44px] cursor-pointer ${styles[variant][color]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {icon}
      {children}
    </a>
  );
}
