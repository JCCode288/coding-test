from dotenv import load_dotenv
load_dotenv()
import os
from langchain_milvus import Milvus
from langchain_huggingface import HuggingFaceEmbeddings

VECTOR_DB_PATH = os.environ.get("VECTOR_DB_PATH")
MAIN_COLLECTION = os.environ.get("VECTOR_COLL_NAME")
COLLECTION_AUTOID = os.environ.get('VECTOR_AUTOID')

def init_embedding():
  return HuggingFaceEmbeddings(
    model_name="jinaai/jina-embeddings-v3",
    model_kwargs={
      "device": "cpu",
      "trust_remote_code": True
    }
  )

def init_vector(embedding):
  return Milvus(
    embedding_function=embedding,
    collection_name=MAIN_COLLECTION,
    connection_args={
      "uri": VECTOR_DB_PATH,
    },
    primary_field="id",
    index_params={"index_type": "IVF_FLAT"},
    enable_dynamic_field=True,
    consistency_level="Strong",
    auto_id=True if COLLECTION_AUTOID else False
  )
