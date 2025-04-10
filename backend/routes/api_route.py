from fastapi import Request, APIRouter
import json


api_router = APIRouter(prefix='/api')

# Load dummy data
with open("../" + "dummyData.json", "r") as f: # path perspective of main.py
    DUMMY_DATA = json.load(f)

@api_router.get("/data")
def get_data():
    """
    Returns dummy data (e.g., list of users).
    """
    return DUMMY_DATA

@api_router.post("/ai")
async def ai_endpoint(request: Request):
    """
    Accepts a user question and returns a placeholder AI response.
    (Optionally integrate a real AI model or external service here.)
    """
    body = await request.json()
    user_question = body.get("question", "")
    
    # Placeholder logic: echo the question or generate a simple response
    # Replace with real AI logic as desired (e.g., call to an LLM).
    return {"answer": f"This is a placeholder answer to your question: {user_question}"}