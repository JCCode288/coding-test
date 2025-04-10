from contextlib import asynccontextmanager
from fastapi import FastAPI
from modules.database.db import init_db, migrate
from sqlalchemy.orm import Session



context = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    context['db'] = init_db()
    # migrate() # uncomment to migrate initial data
    
    yield 
    
    return

async def get_db():
  engine = context['db']
  session = Session(engine)
  
  yield session
  