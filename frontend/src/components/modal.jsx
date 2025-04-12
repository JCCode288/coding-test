"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

export default function Modal({ children, title }) {
   const router = useRouter();

   const handleClose = () => router.back();

   return (
      <Dialog open onOpenChange={handleClose}>
         <DialogTitle>{title}</DialogTitle>
         <DialogContent>{children}</DialogContent>
      </Dialog>
   );
}
