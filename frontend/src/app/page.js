import PromptSection from "@/components/prompt-section";
import { getSalesReps } from "@/lib/api";

export default async function Home() {
   const users = await getSalesReps();

   return (
      <div style={{ padding: "2rem" }}>
         <h1>Next.js + FastAPI Sample</h1>

         <section style={{ marginBottom: "2rem" }}>
            <h2>Dummy Data</h2>
            <ul>
               {users.map((user) => (
                  <li key={user.id}>
                     {user.name} - {user.role}
                  </li>
               ))}
            </ul>
         </section>

         <PromptSection />
      </div>
   );
}
