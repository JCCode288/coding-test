from dotenv import load_dotenv
load_dotenv()
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from .models import Base, SalesReps, Deals, Clients, Skills
from .llm_models import LLMBase
from dto.ai_dto import VectorMetadata
from langchain_core.documents import Document
import json
import os

DB_PATH = os.environ.get("DB_PATH")
LLM_DB_PATH = os.environ.get("LLM_DB_PATH")

def init_db():
  engine = create_engine(f"sqlite://{DB_PATH}", echo=True)
  Base.metadata.create_all(engine)
  
  return engine

def init_llm_db(): 
  """
  this DB mostly not used but will be used for LLM response caching
  """
  llm_engine = create_engine(f"sqlite://{LLM_DB_PATH}", echo=True)
  LLMBase.metadata.create_all(llm_engine)
  
  return llm_engine
      

def migrate():
  # Load dummy data
  with Session(init_db()) as session:
    with open("../" + "dummyData.json", "r") as f: # path perspective of main.py
        DUMMY_DATA = json.load(f)
    
    skills = {}
    clients = {}
    
    def map_skill(skill: str):
      if skill in skills:
        return skills[skill]


      skills[skill] = Skills(name=skill)
      
      return skills[skill]
    
    def map_clients(client):
      if client['name'] in clients:
        return clients[client['name']]
      
      clients[client['name']] = Clients(**client)   
      
      return clients[client['name']]
    
    all_reps = []    
    docs = []
    industries = {}
   
    for sales_reps in DUMMY_DATA['salesReps']:
      # reps = SalesReps(**sales_reps)
      reps = SalesReps(
        id=sales_reps['id'],
        name=sales_reps['name'],
        role=sales_reps['role'],
        region=sales_reps['region'],
        skills=[map_skill(skill) for skill in sales_reps['skills']],
        deals=[Deals(**deal) for deal in sales_reps['deals']],
        clients=[map_clients(client) for client in sales_reps['clients']]
      )
        
      all_reps.append(reps)
      
      base_str = f"Representative: {reps.name}, Role: {reps.role}, Region: {reps.region}"
      
      skill_str = f"{base_str} has skills {", ".join(sales_reps['skills'])}"
      
      deals_str = f"{base_str} has deals with {", ".join(deal.client for deal in reps.deals)} with total value of {sum(deal.value for deal in reps.deals)}"
      
      deals_docs = [f"{base_str} has deal with {deal.client} for value of {deal.value} with status of {deal.status}" for deal in reps.deals]
      
      client_str = f"{base_str} current clients are {", ".join(client.name for client in reps.clients)}"
      
      for client in reps.clients:
        if client.industry not in industries:
          industries[client.industry] = []
          
        industries[client.industry].append(client)
      
      datas = [skill_str, deals_str, client_str, *deals_docs]
      datas = [
        Document(
          page_content=text,
          metadata=VectorMetadata(
            reps_name= reps.name, 
            reps_region= reps.region,
          )
        )
        for text in datas
      ]
      docs = [*docs, *datas]
      
    session.add_all(all_reps)    
    session.commit()
    
    for key, value in industries.items():
      industry_str = f"{key} industry clients are {", ".join(client.name for client in value)}"
      
      data = Document(
        page_content=industry_str,
        metadata=VectorMetadata(
            industry= key,
          )
        )
      
      docs.append(data)
      
    print("=== Insert Vector Result ===")
    print(docs)
    print("=== Insert Vector Result ===")
      
    return docs
    
    