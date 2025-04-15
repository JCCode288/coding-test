from contextlib import asynccontextmanager
from fastapi import FastAPI
from modules.database.db import init_db, migrate
from sqlalchemy.orm import Session



context = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    migrate() # uncomment to migrate initial data
    
    yield 
    
    return

async def get_db():
  db = init_db()
  session = Session(db)
  
  yield session