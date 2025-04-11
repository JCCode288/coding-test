from pydantic import BaseModel, Field


class AIPromptDTO(BaseModel):
  user_id: str = Field()
  prompt: str = Field()


