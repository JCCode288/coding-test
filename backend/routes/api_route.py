from fastapi import APIRouter, Depends, Query, HTTPException
from context import get_db, query_docs, insert_docs
from modules.database.models import SalesReps, Skills, Clients, Deals
from sqlalchemy import select, insert, update, delete, desc
from sqlalchemy.orm import Session, joinedload
from dto.options_dto import QueryParam
from dto.main_dto import AddClientDTO, AddDealDTO, AddRepsDTO, AddSkillDTO, EditDealDTO
from dto.ai_dto import AIPromptDTO, VectorMetadata
from typing import Annotated
from utils.pagination import get_pagination
from modules.llm.model import get_model
from langchain_core.documents import Document
import json

api_router = APIRouter(prefix='/api')

@api_router.get("/sales-reps", status_code=200)
async def get_reps(
    query: Annotated[QueryParam, Query()], 
    db: Session = Depends(get_db)
):
    """
    Returns dummy data (e.g., list of users).
    """
    
    offset = (query.page-1) * query.limit
    
    stmt = (
        select(SalesReps)
        .options(
            joinedload(SalesReps.skills)
        )
    )
    
    if query.query is not None and query.name == "name":
        stmt = stmt.where(SalesReps.name.contains(query.query))
 
    # Pagination
    pagination = get_pagination(
        db, 
        stmt,
        query.limit,
        query.page,
    )    
    
    stmt = (
        stmt
        .limit(query.limit)
        .offset(offset)
    )
    
    data = db.scalars(stmt).unique().all()

    return {"data": data, "pagination": pagination}
        
@api_router.get("/sales-reps/{id}")
async def get_rep_by_id(id: int, db: Session = Depends(get_db)):
    stmt = (
        select(SalesReps)
        .where(SalesReps.id == id)
        .options(
            joinedload(SalesReps.clients),
            joinedload(SalesReps.deals),
            joinedload(SalesReps.skills)
        )
    )
    
    data = db.scalars(stmt).unique().one()
    
    return {"data": data}

@api_router.post('/sales-reps', status_code=201)
async def add_rep(
    body: AddRepsDTO, 
    db: Session = Depends(get_db)
):
    """
    Add Sales Representative
    """
    
    skills: list[Skills] = body.skills
        
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
    
    if len(skills):
        docs = [
            Document(
                page_content=f"New Representative {reps.name} in Region {reps.region} and role as {reps.role} has skills as {", ".join(skill.name for skill in skills)}",
                metadata=VectorMetadata(
                    reps_name=reps.name,
                    reps_region=reps.region
                )
            )
        ]
        insert_docs(docs)
        
    return {"data": body}

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
    
    if query.query is not None:
        stmt = stmt.where(Clients.name.ilike(f"%{query.query}%"))
    
    # Pagination
    pagination = get_pagination(
        db, 
        stmt, 
        query.limit, 
        query.page
    )
    
    offset = (query.page - 1) * query.limit
    stmt = (
        stmt
        .limit(query.limit)
        .offset(offset)
    )
    
    data = db.scalars(stmt).unique().all()
    
    return {"data": data, "pagination": pagination}

@api_router.get("/clients/{id}", status_code=200)
async def get_client_by_id(id: int, db: Session = Depends(get_db)):
    stmt = (
        select(Clients)
        .where(Clients.id == id)
        .options(
            joinedload(Clients.reps),
            joinedload(Clients.deals),
        )
    )
    
    data = db.scalars(stmt).unique().one()
   
    return {"data": data}

@api_router.post('/clients', status_code=201)
async def add_client(body: AddClientDTO, session: Session = Depends(get_db)):
    """
    Add new clients
    """
    with session as db:
        # check reps id
        reps_stmt = (
            select(SalesReps)
            .where(SalesReps.id == body.reps_id)
        )
        
        reps = db.execute(reps_stmt).fetchone()
        
        if not len(reps):
            raise HTTPException(400, "invalid sales reps")
            
        stmt = (
            insert(Clients)
            .values(
                name=body.name,
                contact=body.contact,
                industry=body.industry,
                reps_id=body.reps_id
            )
            .returning(Clients.id, Clients.name)
        )
        
        data = db.execute(stmt).mappings().one()
        db.commit()
         
        docs = [
            Document(
                page_content=f"Client {body.name} has been added working on {body.industry} industry can be contacted on {body.contact}. represented by {reps[0].name}",
                metadata=VectorMetadata(
                    industry=body.industry,
                    reps_name=reps[0].name,
                    reps_region=reps[0].region
                )
            )
        ]
        insert_docs(docs)
        
        return {"data": data}

@api_router.get("/deals", status_code=200)
async def get_deals(query: Annotated[QueryParam, Query()], db: Session = Depends(get_db)):
    """
    Get all deals based on clients ordered by update time and status
    """
    
    stmt = (
        select(Deals)
        .order_by(desc(Deals.updated_at))
        .options(
            joinedload(Deals.reps)
        )
    )
    
    if query.query is not None:
        stmt = stmt.where(Deals.client.ilike(query.query))
        
    pagination = get_pagination(
        db,
        stmt,
        query.limit,
        query.page,
    )
    
    offset = (query.page - 1) * query.limit
    stmt = (
        stmt
        .limit(query.limit)
        .offset(offset)
    )
    
    data = db.scalars(stmt).unique().all()
    
    return {"data": data, "pagination": pagination}

@api_router.get("/deals/{id}", status_code=200)
async def get_deals_by_id(id: int, db: Session = Depends(get_db)):
    stmt = (
        select(Deals)
        .where(Deals.id == id)
        .options(
            joinedload(Deals.reps),
            joinedload(Deals.client_joined)
        )
    )
    
    data = db.scalars(stmt).unique().one()
    
    return {"data": data}

@api_router.post("/deals", status_code=201)
async def add_deal(body: AddDealDTO, db: Session = Depends(get_db)):
    """
    Add new deal
    """
    reps_stmt = (
        select(SalesReps)
        .where(SalesReps.id == body.reps_id)
    )
    reps = db.scalars(reps_stmt).unique().one()
    
    if not reps:
        raise HTTPException(400, "invalid payload")
    
    stmt = (
        insert(Deals)
        .values(
            value=body.value,
            client=body.client,
            status=body.status,
            reps_id=reps.id
        )
        .returning(Deals.id)
    )
    
    inserted = db.execute(stmt).mappings().one()
    db.commit()
    
    docs = [
        Document(
            page_content=f"Representative: {reps.name}, Role: {reps.role}, Region: {reps.region} has deal with {body.client} for value of {body.value} with status of {body.status}",
            metadata=VectorMetadata(
                reps_name=reps.name,
                reps_region=reps.region,
            )
        )
    ]
    insert_docs(docs)
    
    return {"data": inserted}

@api_router.put("/deals/{id}", status_code=201)
async def update_deal(id: int, body: EditDealDTO, db: Session = Depends(get_db)):
    """
    Update deal based on deal id
    """
    
    deal_stmt = (
        select(Deals)
        .where(Deals.id == id)
    )
    deal = db.scalars(deal_stmt).unique().one() ## should throw error if not found
    
    reps_id = body.reps_id or deal.reps_id
    
    reps_stmt = (
        select(SalesReps)
        .where(SalesReps.id == reps_id)
    )
    reps = db.scalars(reps_stmt).unique().one() ## should throw error if not found
    
    if not deal or not reps:
        raise HTTPException(400, "invalid payload")
    
    if body.value:
        deal.value = body.value
    if body.client:
        deal.client = body.client
    if body.status:
        deal.status = body.status
    if body.reps_id:
        deal.reps_id = reps.id
    
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
    
    docs = [
        Document(
            page_content=f"Deal with {deal.client} updated to have value of {deal.value} and status of {deal.status} assigned to {reps.name}",
            metadata=VectorMetadata(
                reps_name=reps.name,
                reps_region=reps.region
            )
        )
   ]
    insert_docs(docs)
    
    return {"data": updated_deal}
    
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
    
    return {"data": data}

@api_router.get('/skills', status_code=200)
async def get_skills(query: str | None = None, db: Session = Depends(get_db)):
    """
    Get all skills for sales reps
    """
    
    stmt = (
        select(Skills)
    )
    
    if query is not None:
        stmt = stmt.where(Skills.name.ilike(f"%{query}%"))
    
    data = db.scalars(stmt).unique().all()
    
    return {"data": data}

@api_router.get('/skills/{id}', status_code=200)
async def get_skill_by_id(id: int, db: Session = Depends(get_db)):
    """
    Get skill based on id with their sales reps
    """
    try:
        
        data = (
            db
            .query(Skills)
            .where(Skills.id == id)
            .options(
                joinedload(Skills.reps)
            )
            .one()
        )
            
        return {"data": data}
    except Exception as err:
        return None

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
    
    return {"data": data}    

async def stream_data(data):
    for char in json.dumps(data):
        yield char

@api_router.post("/ai", status_code=201)
async def ai_endpoint(body: AIPromptDTO, filter: str | None = None, db: Session = Depends(get_db)):
    """
    Accepts a user question and returns a placeholder AI response.
    (Optionally integrate a real AI model or external service here.)
    """
    llm = get_model(
        streaming=True,
    )
   
    docs = query_docs(body.prompt, filter=filter)
    print(docs)
    ctx = [('system', doc.page_content) for doc, score in docs]
    ctx.append(('human', body.prompt))
    
    return await llm.ainvoke(
        ctx
    )
