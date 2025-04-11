import { getSalesReps } from "@/lib/api";

export default async function Home() {
   const reps = await getSalesReps();

   return (
      <div style={{ padding: "2rem" }}>
         <h1>Next.js + FastAPI Sample</h1>

         <section style={{ marginBottom: "2rem" }}>
            <h2>Dummy Data</h2>
            <ul>
               {reps.map((rep) => (
                  <li key={rep.id}>
                     {rep.name} - {rep.role}
                  </li>
               ))}
            </ul>
         </section>
      </div>
   );
}
