from pydantic import BaseModel, Field
from typing import Optional

class QueryParam(BaseModel):
  order_by: str = Field(default="id")
  method: str = Field(default="asc")
  page: int = Field(default=None)
  limit: int = Field(default=None)
  query: Optional[str] = Field(default=None)
  name: Optional[str] = Field(default=None)
  
  
  