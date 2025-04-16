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

# metadata_schema = MilvusClient.create_schema()

# metadata_schema.add_field(
#   field_name="id",
#   datatype=DataType.INT64,
#   auto_id=True,
#   is_primary=True
# )

# metadata_schema.add_field(
#   field_name="vector",
#   datatype=DataType.FLOAT_VECTOR,
#   dim=768
# )

# metadata_schema.add_field(
#   field_name="reps_name",
#   datatype=DataType.VARCHAR,
#   max_length=512,
#   nullable=True
# )

# metadata_schema.add_field(
#   field_name="reps_region",
#   datatype=DataType.VARCHAR,
#   max_length=512,
#   nullable=True
# )

# metadata_schema.add_field(
#   field_name="industry",
#   datatype=DataType.VARCHAR,
#   max_length=512,
#   nullable=True
# )