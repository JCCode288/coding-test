from contextlib import asynccontextmanager
from fastapi import FastAPI
from modules.database.db import init_db, init_llm_db, migrate
from sqlalchemy.orm import Session
from modules.llm.vector_db import init_vector


context = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_vector()
    # migrate() # uncomment to migrate initial data
    
    yield 
    
    return

async def get_db():
  db = init_db()
  session = Session(db)
  
  yield session
  
async def get_llm_db():
  db = init_llm_db()
  session = Session(db)
  
  yield session
  
  