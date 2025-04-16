from dotenv import load_dotenv
load_dotenv()
from langchain_groq import ChatGroq
import os


def get_model(
  temp=0.4, 
  verbose=True,
  max_tokens=5000,
  model_name="llama-3.3-70b-versatile",
  max_retries=2,
  callbacks=None,
  top_p=0.9,
  **kwargs
):
  API_KEY = os.environ.get("LLM_API_KEY")
  
  return ChatGroq(
    api_key=API_KEY,
    temperature=temp,
    verbose=verbose,
    max_retries=max_retries,
    max_tokens=max_tokens,
    model=model_name,
    callbacks=callbacks,
    top_p=top_p,
    **kwargs
  )