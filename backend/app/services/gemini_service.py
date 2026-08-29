from google import genai
from app.config import Config
from app.utils.errors import APIError

class GeminiService:
    @staticmethod
    def _get_client():
        if not Config.GEMINI_API_KEY:
            raise APIError("GEMINI_API_KEY not configured", status_code=500)
        return genai.Client(api_key=Config.GEMINI_API_KEY)

    @staticmethod
    def generate_chat_response(messages_history):
        """
        messages_history: list of dicts with 'role' ('user' or 'assistant') and 'content'
        """
        client = GeminiService._get_client()
        
        contents = []
        for msg in messages_history:
            role = "user" if msg['role'] == "user" else "model"
            contents.append({"role": role, "parts": [{"text": msg['content']}]})
            
        if not contents:
            raise APIError("No conversation history provided", status_code=400)
            
        if contents[-1]['role'] != 'user':
             raise APIError("Last message must be from user", status_code=400)

        try:
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=contents
            )
            return response.text
        except Exception as e:
            raise APIError(f"Gemini API Error: {str(e)}", status_code=502)
