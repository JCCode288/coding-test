from fastapi import Request, APIRouter, Depends
import json
from context import get_db
from modules.database.models import SalesReps, Skills, Clients, Deals
from sqlalchemy import select
from sqlalchemy.orm import Session


api_router = APIRouter(prefix='/api')

# Load dummy data
with open("../" + "dummyData.json", "r") as f: # path perspective of main.py
    DUMMY_DATA = json.load(f)

@api_router.get("/sales-reps")
async def get_reps(db: Session = Depends(get_db)):
    """
    Returns dummy data (e.g., list of users).
    """
    
    stmt = (
        select(SalesReps)
        .join(SalesReps.clients)
        .join(SalesReps.deals)
        .join(SalesReps.skills)
    )
        
    data = db.scalars(stmt).unique().all()
        
    return data
    

@api_router.post('/sales-reps')
async def add_rep(body, db: Session = Depends(get_db)):
    """
    Add Sales Representative
    """
    pass

@api_router.get('/clients')
async def get_clients(db: Session = Depends(get_db)):
    """
    Get all clients and their deals
    """
    return db.scalars(select)

@api_router.post('/clients')
async def add_client(body, db: Session = Depends(get_db)):
    """
    Add new clients
    """
    pass

@api_router.get("/deals")
async def get_deals(db: Session = Depends(get_db)):
    """
    Get all deals based on clients ordered by update time and status
    """
    pass

@api_router.post("/deals")
async def add_deal(body, db: Session = Depends(get_db)):
    """
    Add new deal
    """
    pass

@api_router.put("/deals/{id}")
async def update_deal(param, body, db: Session = Depends(get_db)):
    
    """
    Update deal based on deal id
    """
    pass

@api_router.delete("/deals/{id}")
async def delete_deal(param, db: Session = Depends(get_db)):
    """
    Delete deal based on id
    """
    pass

@api_router.post("/ai")
async def ai_endpoint(request: Request, db: Session = Depends(get_db)):
    """
    Accepts a user question and returns a placeholder AI response.
    (Optionally integrate a real AI model or external service here.)
    """
    body = await request.json()
    user_question = body.get("question", "")
    
    # Placeholder logic: echo the question or generate a simple response
    # Replace with real AI logic as desired (e.g., call to an LLM).
    return {"answer": f"This is a placeholder answer to your question: {user_question}"}

@api_router.get('/skills')
async def get_skills(db: Session = Depends(get_db)):
    """
    Get all skills for sales reps
    """
    pass


@api_router.post('/skills')
async def add_skill(body, db: Session = Depends(get_db)):
    """
    Add new skills for sales reps
    """
    pass

