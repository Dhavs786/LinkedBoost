from io import BytesIO
import PyPDF2
from fastapi import HTTPException

def parse_linkedin_pdf(file_bytes: bytes) -> dict:
    """
    Parses a LinkedIn profile PDF and returns the raw text and some basic structured data.
    """
    try:
        reader = PyPDF2.PdfReader(BytesIO(file_bytes))
        raw_text = ""
        for page in reader.pages:
            raw_text += page.extract_text() + "\n"
            
        if not raw_text.strip():
            raise HTTPException(status_code=400, detail="The uploaded PDF appears to be empty or unreadable.")

        # Extract basic info (first line is usually the name)
        lines = [line.strip() for line in raw_text.split('\n') if line.strip()]
        
        name = "LinkedIn User"
        headline = "Profile Data"
        
        if len(lines) > 0:
            name = lines[0]
            # Try to guess the headline (usually the 2nd or 3rd line)
            if len(lines) > 1 and "Contact" not in lines[1] and "Top Skills" not in lines[1]:
                headline = lines[1]
                
        # Split name if possible
        name_parts = name.split(' ', 1)
        first_name = name_parts[0] if len(name_parts) > 0 else "LinkedIn"
        last_name = name_parts[1] if len(name_parts) > 1 else "User"
            
        return {
            "firstName": first_name,
            "lastName": last_name,
            "headline": headline,
            "summary": "Data extracted from uploaded PDF.",
            "raw_text": raw_text[:8000] # Limit size to prevent token limits
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse PDF: {str(e)}")
