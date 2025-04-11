from pydantic import BaseModel, Field

class QueryParam(BaseModel):
  order_by: str = Field(default="id")
  method: str = Field(default="asc")
  
  