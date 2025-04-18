from contextlib import asynccontextmanager, contextmanager
from fastapi import FastAPI
from modules.database.db import init_db, init_llm_db, migrate
from sqlalchemy.orm import Session
from modules.llm.vector_db import init_vector, init_embedding

context = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    context['embedding'] = init_embedding()
    context['vector_store'] = init_vector(embedding=context['embedding'])
    
    # migrate_docs =  migrate() # uncomment to migrate initial data
    # insert_docs(migrate_docs) # uncomment to migrate initial data
    
    context['db'] = init_db()
    context['llm_db'] = init_llm_db()
    
    yield 
    
    return

async def get_db():
  if 'db' not in context:
    context['db'] = init_db()
  
  with Session(context['db']) as session:
    try:
      yield session
    except Exception as err:
      print("Error when executing in db")
      raise err
    finally:
      session.close()
  
async def get_llm_db():
  if 'llm_db' not in context:
    context['llm_db'] = init_llm_db()
    
  session = Session(context['llm_db'])
  
  yield session

@contextmanager
def get_vector_db():
  if 'vector_store' not in context:
    context['vector_store'] = init_vector(embedding=get_embedding())
    
  yield context['vector_store']

@contextmanager
def get_embedding():
  if 'embedding' not in context:
    context['embedding'] = init_embedding()
  
  yield context['embedding']
  
def insert_docs(docs: list[dict]):
  print("=== Insert Vector Documents ===")
  print(docs)
  print("=== Insert Vector Documents ===")
  
  with get_vector_db() as client:
    return client.add_documents(docs)

def query_docs(query: str, filter=None, limit=5):
  with get_vector_db() as client:
    return client.similarity_search_with_score(
      query=query,
      k=limit,
      expr=filter
    )
  
