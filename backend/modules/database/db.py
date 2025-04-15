from dotenv import load_dotenv
load_dotenv()
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from .models import Base, SalesReps, Deals, Clients, Skills
import json
import os

DB_PATH = os.environ.get("DB_PATH")

engine = create_engine(f"sqlite://{DB_PATH}", echo=True)



def init_db():
  Base.metadata.create_all(engine)
  
  return engine
      

def migrate():
  # Load dummy data
  init_db()
  
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
  
  with Session(engine) as session:
    all_reps = []    
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
      
      
    session.add_all(all_reps)    
    session.commit()

        
    