from sqlalchemy import ForeignKey
from sqlalchemy import String, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from datetime import datetime

class LLMBase(DeclarativeBase):
    created_at: Mapped[datetime] = mapped_column(
        DateTime(), 
        server_default=func.current_timestamp()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(), 
        server_default=func.current_timestamp(), 
        onupdate=func.current_timestamp()
    )

class Users(LLMBase):
  __tablename__ = "Users"
  id: Mapped[int] = mapped_column(primary_key=True)
  unique_identifier: Mapped[str] = mapped_column(
    String(64), 
    unique=True, 
    nullable=False, 
    index=True
  )
  sessions: Mapped['UserSession'] = relationship(
    back_populates="user"
  )
  
class UserSession(LLMBase):
  __tablename__ = "UserSession"
  id: Mapped[int] = mapped_column(primary_key=True)
  user_id: Mapped[int] = mapped_column(ForeignKey("Users.id"))
  user: Mapped["Users"] = relationship(back_populates="sessions")