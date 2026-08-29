import os
from dotenv import load_dotenv
from app.services.gemini_service import GeminiService
from app.config import Config
from google import genai

def test_gemini():
    load_dotenv()
    Config.GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    
    if not Config.GEMINI_API_KEY:
        print("FAIL: GEMINI_API_KEY not found in environment.")
        return
        
    print(f"API Key found (starts with: {Config.GEMINI_API_KEY[:5]}...)")
    
    messages = [
        {"role": "user", "content": "Hello! Please respond with exactly 'PONG'."}
    ]
    
    response = GeminiService.generate_chat_response(messages)
    print("PASS: Received response from Gemini:")
    print(f"Response: {response}")

if __name__ == "__main__":
    test_gemini()
