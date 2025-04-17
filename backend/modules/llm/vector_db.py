from dotenv import load_dotenv
load_dotenv()
import os
from langchain_milvus import Milvus
from langchain_huggingface import HuggingFaceEmbeddings

VECTOR_DB_PATH = os.environ.get("VECTOR_DB_PATH")
MAIN_COLLECTION = os.environ.get("VECTOR_COLL_NAME")
COLLECTION_AUTOID = os.environ.get('VECTOR_AUTOID')

embedding = HuggingFaceEmbeddings(
  model_name="jinaai/jina-embeddings-v3",
  model_kwargs={
    "device": "cpu",
    "trust_remote_code": True
  }
)

def get_vector_db() -> Milvus:
  # client = MilvusClient(VECTOR_DB_PATH)
  client = Milvus(
    embedding_function=embedding,
    collection_name=MAIN_COLLECTION,
    connection_args={
      "uri": VECTOR_DB_PATH,
    },
    primary_field="id",
    index_params={"index_type": "IVF_FLAT"},
    enable_dynamic_field=True,
    auto_id=True if COLLECTION_AUTOID else False
  )
  
  return client

def init_vector():
  client = get_vector_db()
  
  return client

def get_embedding():
  return embedding

def insert_docs(docs: list[dict]):
  print("=== Insert Vector Documents ===")
  print(docs)
  print("=== Insert Vector Documents ===")
  
  client = get_vector_db()
  
  # uuids = [str(uuid4()) for _ in range(len(docs))]
  
  return client.add_documents(docs)

def query_docs(query: str, filter=None, limit=5):
  client = get_vector_db()
  
  return client.similarity_search_with_score(
    query=query,
    k=limit,
    expr=filter
  )
  
  