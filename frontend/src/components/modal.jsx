"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

export default function Modal({ children, title }) {
   const router = useRouter();

   const handleClose = () => router.back();

   return (
      <Dialog open onOpenChange={handleClose}>
         <DialogContent className="flex-1 min-w-1/2 min-h-[80dvh]">
            <DialogTitle>{title}</DialogTitle>
            {children}
         </DialogContent>
      </Dialog>
   );
}
