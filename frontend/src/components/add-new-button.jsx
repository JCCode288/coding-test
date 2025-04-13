import { Button } from "./ui/button";

export default function AddNewButton({ children }) {
   return (
      <Button variant="outline" className="border-slate-300">
         {children}
      </Button>
   );
}
