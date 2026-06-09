from fastapi import APIRouter
from pydantic import BaseModel

from app.vector_store import search_chunks
from app.groq_client import ask_groq

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(request: ChatRequest):

    chunks = search_chunks(
        request.message
    )

    context = "\n".join(chunks)

    answer = ask_groq(
        context,
        request.message
    )

    return {
        "answer": answer
    }