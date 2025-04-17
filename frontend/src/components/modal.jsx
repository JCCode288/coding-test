"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { createContext, useState } from "react";

export const ModalContext = createContext({ open: true, setIsOpen: null });

export default function Modal({ children, title }) {
   const router = useRouter();
   const [isOpen, setIsOpen] = useState(true);

   const handleClose = (open) => {
      if (open) return setIsOpen(() => true);

      setIsOpen(() => false);
      return router.back();
   };

   return (
      <ModalContext.Provider value={{ open: isOpen, setIsOpen }}>
         <Dialog defaultOpen open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="flex-1 min-w-1/2 min-h-[80dvh]">
               <DialogTitle>{title}</DialogTitle>
               {children}
            </DialogContent>
         </Dialog>
      </ModalContext.Provider>
   );
}
