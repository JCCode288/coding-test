from fastapi import Request, APIRouter, Depends, Query, HTTPException
import json
from context import get_db
from modules.database.models import SalesReps, Skills, Clients, Deals
from sqlalchemy import select, insert, update, delete
from sqlalchemy.orm import Session, joinedload
from dto.options_dto import QueryParam
from dto.main_dto import AddClientDTO, AddDealDTO, AddRepsDTO, AddSkillDTO, EditDealDTO
from typing import Annotated


api_router = APIRouter(prefix='/api')

# Load dummy data
with open("../" + "dummyData.json", "r") as f: # path perspective of main.py
    DUMMY_DATA = json.load(f)

@api_router.get("/sales-reps", status_code=200)
async def get_reps(query: Annotated[QueryParam, Query()], db: Session = Depends(get_db)):
    """
    Returns dummy data (e.g., list of users).
    """
    
    stmt = (
        select(SalesReps)
        .options(
            joinedload(SalesReps.clients),
            joinedload(SalesReps.deals),
            joinedload(SalesReps.skills)
        )
    )
        
    return db.scalars(stmt).unique().all()
    

@api_router.post('/sales-reps', status_code=201)
async def add_rep(body: AddRepsDTO, db: Session = Depends(get_db)):
    """
    Add Sales Representative
    """
    
    skills: list[Skills]
        
    if len(body.skills):
        skills_stmt = (
            select(Skills)
            .where(Skills.id.in_(body.skills))
        )
        skills = [data[0] for data in db.execute(skills_stmt).fetchall()]
        
    reps = SalesReps(
        name=body.name,
        region=body.region,
        role=body.role,
        skills=skills
    )
    
    db.add(reps)
    db.commit()
    
    return body

@api_router.get('/clients', status_code=200)
async def get_clients(query: Annotated[QueryParam, Query()], db: Session 
                      = Depends(get_db)):
    """
    Get all clients and their deals
    """
    
    
    stmt = (
        select(Clients)
        .options(joinedload(Clients.reps))
    )
    
    return db.scalars(stmt).unique().all()

@api_router.post('/clients', status_code=201)
async def add_client(body: AddClientDTO, db: Session = Depends(get_db)):
    """
    Add new clients
    """
    
    # check reps id
    reps_stmt = (
        select(SalesReps)
        .where(SalesReps.id == body.reps_id)
    )
    
    reps = db.execute(reps_stmt).fetchone()
    
    if not len(reps):
        raise HTTPException(400, "invalid sales reps")
    
    print(reps)
    
    stmt = (
        insert(Clients)
        .values(
            name=body.name,
            contact=body.contact,
            industry=body.industry,
            reps_id=reps[0].id
        )
        .returning(Clients.id, Clients.name)
    )
    
    data = db.execute(stmt).mappings().one()
    db.commit()
    
    return data

@api_router.get("/deals", status_code=200)
async def get_deals(query: Annotated[QueryParam, Query()], db: Session = Depends(get_db)):
    """
    Get all deals based on clients ordered by update time and status
    """
    
    stmt = (
        select(Deals)
        .options(
            joinedload(Deals.reps)
        )
    )
    
    return db.scalars(stmt).unique().all()

@api_router.post("/deals", status_code=201)
async def add_deal(body: AddDealDTO, db: Session = Depends(get_db)):
    """
    Add new deal
    """
    stmt = (
        insert(Deals)
        .values(
            value=body.value,
            client=body.client,
            status=body.status,
            reps_id=body.reps_id
        )
        .returning(Deals.id)
    )
    
    inserted = db.execute(stmt).mappings().one()
    db.commit()
    
    return inserted
    

@api_router.put("/deals/{id}", status_code=201)
async def update_deal(id: int, body: EditDealDTO, db: Session = Depends(get_db)):
    """
    Update deal based on deal id
    """
    if body.id != id:
        raise HTTPException(403, "not authorized")
    
    deal_stmt = (
        select(Deals)
        .where(Deals.id == id)
    )
    deal = db.scalars(deal_stmt).unique().one()
    
    if body.value:
        deal.value = body.value
    if body.client:
        deal.client = body.client
    if body.reps_id:
        deal.reps_id = body.reps_id
    
    update_stmt = (
        update(Deals)
        .where(Deals.id == id)
        .values(
            id=deal.id,
            value=deal.value,
            client=deal.client,
            reps_id=deal.reps_id
        )
        .returning(Deals.id)
    )
    
    updated_deal = db.execute(update_stmt).mappings().one()
    db.commit()
    
    return updated_deal
    
    
    

@api_router.delete("/deals/{id}", status_code=200)
async def delete_deal(id: int, db: Session = Depends(get_db)):
    """
    Delete deal based on id
    """
    
    deal_stmt = (
        select(Deals)
        .where(Deals.id == id)
    )
    
    deal = db.scalars(deal_stmt).unique().all()
    
    if not len(deal):
        raise HTTPException(400, "invalid deal")
    
    delete_stmt = (
        delete(Deals)
        .where(Deals.id == id)
        .returning(Deals.id, Deals.client, Deals.value)
    )
    
    data = db.execute(delete_stmt).mappings().one()
    db.commit()
    
    return data
    
    
    
    

@api_router.post("/ai", status_code=201)
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

@api_router.get('/skills', status_code=200)
async def get_skills(query: Annotated[QueryParam, Query()], db: Session = Depends(get_db)):
    """
    Get all skills for sales reps
    """
    
    stmt = (
        select(Skills)
    )
    
    return db.scalars(stmt).unique().all()


@api_router.post('/skills', status_code=201)
async def add_skill(body: AddSkillDTO, db: Session = Depends(get_db)):
    """
    Add new skills for sales reps
    """
    
    stmt = (
        insert(Skills)
        .values(name=body.name)
        .returning(Skills.id, Skills.name)
    )
    
    res = db.execute(stmt)    
    data = res.mappings().one()

    db.commit()
    
    return data
