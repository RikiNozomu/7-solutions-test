"use client";

import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  timeout?: number;
  onTimeOut?: () => void;
}

export default function Item({
  className,
  children,
  timeout = 5000,
  onTimeOut = () => {},
  ...props
}: ItemProps) {

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onTimeOut();
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      {...props}
      className={twMerge(
        "w-full border rounded shadow bg-white hover:bg-gray-300 transition-all hover:cursor-pointer p-1",
        className
      )}
    >
      {children}
    </div>
  );
}
