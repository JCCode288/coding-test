import { Suspense } from "react";

export default function NewClients() {
   return (
      <section className="flex flex-1 m-8 justify-center">
         <Suspense fallback={<>Loading..</>}>Masuk New Client</Suspense>
      </section>
   );
}
