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
      <section className="sm:flex sm:flex-col sm:self-end ml-8 sm:sticky sm:bottom-0 sm:right-0 bg-inherit p-4 sm:w-92">
         {answer && (
            <div style={{ marginTop: "1rem" }}>
               <strong>AI Response:</strong> {answer}
            </div>
         )}
         <div>
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
         </div>
      </section>
   );
}
