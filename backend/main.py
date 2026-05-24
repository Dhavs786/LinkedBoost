from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pdf_parser import parse_linkedin_pdf
from llm import enhance_profile, chat_about_profile

app = FastAPI(title="LinkedIn Profile Enhancer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str
    profile_data: dict

@app.post("/api/analyze")
async def analyze_profile(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed. Please upload a LinkedIn profile PDF.")
    
    try:
        # Read the uploaded PDF file
        file_bytes = await file.read()
        
        # Parse the PDF
        profile_data = parse_linkedin_pdf(file_bytes)
        
        # Send the data to Gemini for enhancement
        suggestions = enhance_profile(profile_data)
        
        return {
            "profile": profile_data,
            "suggestions": suggestions
        }
    except Exception as e:
        print(f"Error analyzing profile: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
def chat_profile(req: ChatRequest):
    if not req.profile_data or not req.question:
        raise HTTPException(status_code=400, detail="Profile data and question are required")
        
    answer = chat_about_profile(req.profile_data, req.question)
    
    return {
        "answer": answer
    }
