import os
from google import genai
from dotenv import load_dotenv

# Ensure we look for .env in the backend directory
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("Warning: GEMINI_API_KEY is not set in the environment.")
    # Client will be instantiated but will fail later if not mocked, 
    # but we pass a dummy key to prevent immediate initialization crash
    client = genai.Client(api_key="DUMMY_KEY_TO_PREVENT_CRASH")
else:
    client = genai.Client(api_key=GEMINI_API_KEY)

# Use Gemini 2.5 Flash for fast and good responses
model_id = 'gemini-2.5-flash'

def enhance_profile(profile_data: dict) -> str:
    """
    Sends the profile data to Gemini and asks for enhancements.
    """
    prompt = f"""
    You are an expert career coach and LinkedIn profile optimizer. 
    Review the following LinkedIn profile data and provide specific, actionable suggestions 
    to enhance it. Focus on improving the headline, summary, and experience bullet points 
    to make the profile more compelling to recruiters and industry professionals.
    Format your response in Markdown, using clear headings and bullet points.

    Profile Data:
    {profile_data}
    """
    
    try:
        response = client.models.generate_content(
            model=model_id,
            contents=prompt,
        )
        return response.text
    except Exception as e:
        print(f"Error generating enhancement: {e}")
        return "An error occurred while generating suggestions. Please ensure your Gemini API key is correct."

def chat_about_profile(profile_data: dict, question: str) -> str:
    """
    Answers a specific user question based on their profile data.
    """
    prompt = f"""
    You are a career coach. Use the following LinkedIn profile data to answer the user's question.
    Be helpful, encouraging, and specific.
    
    Profile Data:
    {profile_data}
    
    User Question: {question}
    """
    
    try:
        response = client.models.generate_content(
            model=model_id,
            contents=prompt,
        )
        return response.text
    except Exception as e:
        print(f"Error generating chat response: {e}")
        return "An error occurred while answering your question."
