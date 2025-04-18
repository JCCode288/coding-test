"use client";

import { useRouter } from "next/navigation";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogTitle,
} from "./ui/dialog";
import { createContext, useContext, useState } from "react";

export const ModalContext = createContext({
   open: true,
   setIsOpen: null,
});

export default function Modal({ children, title }) {
   const router = useRouter();
   const [isOpen, setIsOpen] = useState(true);

   const handleClose = () => {
      setIsOpen(() => false);

      return router.back();
   };

   const handleEscKey = () => router.back();

   return (
      <ModalContext.Provider value={{ open: isOpen, setIsOpen }}>
         <Dialog defaultOpen open={isOpen}>
            <DialogClose onClick={handleClose} />
            <DialogContent
               onClose={handleClose}
               onEscapeKeyDown={handleEscKey}
               onInteractOutside={handleClose}
               className="flex-1 min-w-1/2 min-h-[80dvh]"
            >
               <DialogTitle>{title}</DialogTitle>
               {children}
            </DialogContent>
         </Dialog>
      </ModalContext.Provider>
   );
}
