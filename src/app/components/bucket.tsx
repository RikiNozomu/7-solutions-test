"use client";

import { twMerge } from "tailwind-merge";

interface BucketProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  classNames?: {
    title?: string;
    children?: string;
  };
  "date-testid"?: string;
}

export default function Bucket({
  className,
  classNames,
  children,
  "date-testid": testId,
  title = "",
  ...props
}: BucketProps) {
  return (
    <div
      {...props}
      className={twMerge("flex flex-col border rounded-xl", className)}
    >
      <div
        className={twMerge(
          "w-full text-center p-1 bg-gray-300 rounded-t-xl font-bold title",
          classNames?.title
        )}
      >
        {title}
      </div>
      <div
        className={twMerge("flex flex-col gap-2 p-1", classNames?.children)}
        data-testid={testId}
      >
        {children}
      </div>
    </div>
  );
}
