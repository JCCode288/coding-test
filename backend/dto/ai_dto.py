from pydantic import BaseModel, Field
from typing import TypedDict, Optional, Any
from datetime import datetime


class AIPromptDTO(BaseModel):
  user_id: str = Field()
  prompt: str = Field()


class VectorDoc(TypedDict):
  text: str
  industry: Optional[str] = None
  reps_name: Optional[str] = None
  reps_region: Optional[str] = None
  vector: Any
  created_at: int 
  
  
  @classmethod
  def build(
    cls,
    text:str,
    industry = None,
    reps_name = None,
    reps_region = None,
    vector = None,
    created_at = int(datetime.now().strftime("%s"))
  ):
    print(text)
    return VectorDoc(
      text=text,
      industry=industry,
      reps_name=reps_name,
      reps_region=reps_region,
      vector=vector,
      created_at=created_at
    )