import { cn } from "@/utils/shadcn";

function Skeleton({ className, ...props }) {
   return (
      <div
         data-slot="skeleton"
         className={cn("bg-accent animate-pulse rounded-md", className)}
         {...props}
      />
   );
}

export { Skeleton };
