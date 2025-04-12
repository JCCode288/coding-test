from typing import List, Optional
from sqlalchemy import ForeignKey
from sqlalchemy import String, Text, DateTime, Table, Column, BigInteger
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from datetime import datetime

class Base(DeclarativeBase):
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), 
        server_default=func.current_timestamp()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(), 
        server_default=func.current_timestamp(), 
        onupdate=func.current_timestamp()
    )

rep_skill_table = Table(
    "RepSkill",
    Base.metadata,
    Column("reps_id", ForeignKey("SalesReps.id")),
    Column("skill_id", ForeignKey("Skills.id"))
)

class SalesReps(Base):
    __tablename__ = "SalesReps"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False) # might converted into text
    region: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(Text())
    skills: Mapped[List["Skills"]] = relationship(
        secondary=rep_skill_table, 
        back_populates="reps",
        
    )
    deals: Mapped[List["Deals"]] = relationship(
        back_populates="reps",
        
    )
    clients: Mapped[List["Clients"]] = relationship(
        back_populates="reps",
        
    )
    
class Skills(Base):
    __tablename__ = "Skills"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    reps: Mapped[List["SalesReps"]] = relationship(
        secondary=rep_skill_table,
        back_populates="skills", 
        
    )
 
    
class Deals(Base):
    __tablename__ = "Deals"
    id: Mapped[int] = mapped_column(primary_key=True)
    value: Mapped[str] = mapped_column(BigInteger(), nullable=False)
    status: Mapped[str] = mapped_column(
        String(64), 
        nullable=False, 
        default="In Progress"
    ) # easier and simpler status implementation
    client: Mapped[str] = mapped_column(String(255), ForeignKey("Clients.name"), nullable=False)
    
    reps_id: Mapped[int] = mapped_column(ForeignKey("SalesReps.id"))
    reps: Mapped["SalesReps"] = relationship(
        back_populates="deals",
        
    )
    
class Clients(Base):
    __tablename__ = "Clients"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(
        String(255), 
        unique=True, 
        nullable=False,
        index=True
    )
    contact: Mapped[str] = mapped_column(
        String(255), 
        unique=True, 
        nullable=False,
        index=True
    )
    industry: Mapped[str] = mapped_column(String(128), nullable=True)
    
    reps_id: Mapped[int] = mapped_column(ForeignKey("SalesReps.id"))
    reps: Mapped["SalesReps"] = relationship(
        back_populates='clients',
        
    )
    deals: Mapped[List["Deals"]] = relationship(
        "Deals",
        primaryjoin="Clients.name==Deals.client",
        backref="Deals"
    )    