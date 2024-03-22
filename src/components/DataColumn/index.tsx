import React from "react";
import { cn } from "../../utils/cn";

type DataColumnProps = {
  title?: string;
  className?: string;
  children: React.ReactNode;
  id?: string;
};

const DataColumn = ({ title, className, children, id }: DataColumnProps) => {
  return (
    <div
      id={id}
      className={cn(
        "flex flex-col gap-y-6 border border-neutral-200 shadow h-full p-2",
        className
      )}
    >
      {title && (
        <div className="bg-neutral-300 text-black text-xl h-11 w-full text-center flex justify-center items-center">
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default DataColumn;
