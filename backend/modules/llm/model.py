from dotenv import load_dotenv
load_dotenv()
from langchain_groq import ChatGroq
from langchain.globals import set_llm_cache, set_verbose
from langchain.cache import SQLAlchemyCache
from modules.database.db import init_llm_db
import os

class CustomSQLiteCache(SQLAlchemyCache):
  def __init__(self, engine):
    super().__init__(engine)

set_llm_cache(SQLAlchemyCache(init_llm_db()))
set_verbose(True if os.environ.get("LLM_VERBOSE") else False)

def get_model(
  temp=0.4, 
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
    max_retries=max_retries,
    max_tokens=max_tokens,
    model=model_name,
    callbacks=callbacks,
    top_p=top_p,
    **kwargs
  )