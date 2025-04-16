from dotenv import load_dotenv
load_dotenv()
import os
from pymilvus import MilvusClient, model

VECTOR_DB_PATH = os.environ.get("VECTOR_DB_PATH")
MAIN_COLLECTION = os.environ.get("VECTOR_COLL_NAME")
COLLECTION_AUTOID = os.environ.get('VECTOR_AUTOID')

embedding = model.DefaultEmbeddingFunction()

def get_vector_db() -> MilvusClient:
  client = MilvusClient(VECTOR_DB_PATH)
  return client

def init_vector():
  client = get_vector_db()
  if not client.has_collection(MAIN_COLLECTION):
    client.create_collection(
      MAIN_COLLECTION, 
      dimension=embedding.dim, 
      auto_id=True if COLLECTION_AUTOID else False
    ) # 768 is default embedding function embedding shape
  
  return client

def get_embedding():
  return embedding

def insert_docs(docs: list[dict]):
  print("=== Insert Vector Documents ===")
  print(docs)
  print("=== Insert Vector Documents ===")
  
  client = get_vector_db()
  embedding = get_embedding()
  
  vectors = embedding.encode_documents([doc["text"] for doc in docs])
  embed_docs = []
  
  for i in range(len(vectors)):
    doc = docs[i]
    doc['vector'] = vectors[i]
    embed_docs.append(doc)
  
  return client.insert(MAIN_COLLECTION, embed_docs)

def query_docs(query: str | list[str], filter=None, limit=5):
  client = get_vector_db()
  embedding = get_embedding()
  query: list[str] = [query] if type(query) == str else query
  
  vector_q = embedding.encode_queries(query)
  
  ## Default Metric type is Cosine
  return client.search( 
    collection_name=MAIN_COLLECTION,
    data=vector_q,
    anns_field="vector",
    filter=filter,
    limit=limit,
    output_fields=['text', "created_at", "reps_name"],
  )[0]