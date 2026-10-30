import { cn } from "@/lib/utils";

export const Block = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("px-4 py-8", className)}>{children}</div>;
};
