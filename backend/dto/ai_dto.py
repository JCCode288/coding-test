from pydantic import BaseModel, Field
from typing import TypedDict, Optional, Any

class AIPromptDTO(BaseModel):
  user_id: str = Field()
  prompt: str = Field()


class VectorMetadata(TypedDict):
  industry: Optional[str] = None
  reps_name: Optional[str] = None
  reps_region: Optional[str] = None
  vector: Any
