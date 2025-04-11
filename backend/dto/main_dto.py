from pydantic import BaseModel, Field
from typing import List, Optional

class AddRepsDTO(BaseModel):
  name: str = Field()
  region: str = Field()
  role: str = Field()
  skills: Optional[List[int]] = Field(default=[])
  
class AddSkillDTO(BaseModel):
  name: str= Field()
  
class AddClientDTO(BaseModel):
  name: str = Field()
  contact: str = Field()
  industry: str = Field()
  reps_id: int = Field()

class AddDealDTO(BaseModel):
  value: int = Field()
  client: str = Field()
  status: Optional[str] = Field(default="In Progress")
  reps_id: int = Field()
  
class EditDealDTO(BaseModel):
  id: int = Field()
  value: Optional[int] = Field()
  client: Optional[str] = Field()
  reps_id: Optional[int] = Field()