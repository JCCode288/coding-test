"use client";

import { promptAI } from "@/lib/api";
import { useState } from "react";

export default function PromptSection() {
   const [question, setQuestion] = useState("");
   const [answer, setAnswer] = useState("");

   const handleAskQuestion = async () => {
      try {
         const aiAnswer = promptAI(question);
         setAnswer(() => aiAnswer);
      } catch (error) {
         console.error("Error in AI request:", error);
      }
   };

   return (
      <section>
         <h2>Ask a Question (AI Endpoint)</h2>
         <div>
            <input
               type="text"
               placeholder="Enter your question..."
               value={question}
               onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={handleAskQuestion}>Ask</button>
         </div>
         {answer && (
            <div style={{ marginTop: "1rem" }}>
               <strong>AI Response:</strong> {answer}
            </div>
         )}
      </section>
   );
}
